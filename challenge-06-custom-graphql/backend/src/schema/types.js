const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const { User } = require('../models/User');
const { Post } = require('../models/Post');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => Post.findByUserId(user.id)
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: UserType,
      resolve: (post) => User.findById(post.authorId)
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.findAll()
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, { id }) => User.findById(id)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => Post.findAll()
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, { id }) => Post.findById(id)
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { name, email }) => User.create({ name, email })
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, { title, content, authorId }) => Post.create({ title, content, authorId })
    }
  }
});

module.exports = {
  QueryType,
  MutationType,
  UserType,
  PostType
};