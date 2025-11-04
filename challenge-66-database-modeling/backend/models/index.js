const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Tag = require('./Tag');
const PostTag = require('./PostTag');

// Define relationships
User.hasMany(Post, {
  foreignKey: 'author_id',
  as: 'posts'
});

Post.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'author'
});

User.hasMany(Comment, {
  foreignKey: 'author_id',
  as: 'comments'
});

Comment.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'author'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post'
});

Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: 'post_id',
  otherKey: 'tag_id',
  as: 'tags'
});

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: 'tag_id',
  otherKey: 'post_id',
  as: 'posts'
});

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Tag,
  PostTag
};