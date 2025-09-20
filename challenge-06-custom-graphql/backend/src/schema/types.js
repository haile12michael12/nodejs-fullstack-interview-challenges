const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => Post.findByUserId(user.id)
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
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
        id: { type: GraphQLNonNull(GraphQLInt) }
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
        id: { type: GraphQLNonNull(GraphQLInt) }
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
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { name, email }) => User.create({ name, email })
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
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

