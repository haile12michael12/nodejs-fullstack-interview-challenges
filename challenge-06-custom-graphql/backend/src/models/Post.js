const { User } = require('./User');

class Post {
  constructor(id, title, content, authorId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  static posts = [
    { id: 1, title: 'Hello World', content: 'This is my first post!', authorId: 1 },
    { id: 2, title: 'GraphQL is Awesome', content: 'Learning GraphQL has been great!', authorId: 2 },
    { id: 3, title: 'Node.js Tips', content: 'Some useful Node.js tips and tricks.', authorId: 1 }
  ];

  static findAll() {
    return this.posts.map(post => new Post(post.id, post.title, post.content, post.authorId));
  }

  static findById(id) {
    const post = this.posts.find(p => p.id === id);
    return post ? new Post(post.id, post.title, post.content, post.authorId) : null;
  }

  static findByUserId(userId) {
    return this.posts
      .filter(p => p.authorId === userId)
      .map(post => new Post(post.id, post.title, post.content, post.authorId));
  }

  static create({ title, content, authorId }) {
    const id = Math.max(...this.posts.map(p => p.id)) + 1;
    const post = { id, title, content, authorId };
    this.posts.push(post);
    return new Post(post.id, post.title, post.content, post.authorId);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId
    };
  }
}

module.exports = { Post };




