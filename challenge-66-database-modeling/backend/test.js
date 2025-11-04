const { sequelize, User, Post, Comment, Tag } = require('./models');

async function runTests() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Create a user
    const user = await User.create({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'hashedpassword123',
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Software developer'
    });
    console.log('Created user:', user.toJSON());

    // Create tags
    const techTag = await Tag.create({
      name: 'technology',
      description: 'Tech related posts'
    });
    
    const programmingTag = await Tag.create({
      name: 'programming',
      description: 'Programming related posts'
    });
    console.log('Created tags');

    // Create a post
    const post = await Post.create({
      title: 'Understanding Database Relationships',
      content: 'This is a comprehensive guide to database relationships...',
      slug: 'understanding-database-relationships',
      status: 'published',
      published_at: new Date(),
      author_id: user.id
    });
    console.log('Created post:', post.toJSON());

    // Associate tags with post
    await post.addTags([techTag, programmingTag]);
    console.log('Associated tags with post');

    // Create a comment
    const comment = await Comment.create({
      content: 'Great article! Thanks for sharing.',
      status: 'approved',
      author_id: user.id,
      post_id: post.id
    });
    console.log('Created comment:', comment.toJSON());

    // Query user with posts
    const userWithPosts = await User.findByPk(user.id, {
      include: [{
        model: Post,
        as: 'posts'
      }]
    });
    console.log('User with posts:', userWithPosts.toJSON());

    // Query post with author and tags
    const postWithRelations = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author'
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    });
    console.log('Post with relations:', postWithRelations.toJSON());

    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await sequelize.close();
  }
}

runTests();