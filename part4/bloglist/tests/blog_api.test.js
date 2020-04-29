const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

const extraBlog =
  {
    id: '5a422aa71b54a6762317f8',
    title: 'Some xtra blog',
    author: 'Ella W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

const noLikes =
  {
    id: '907942jhkh53u529',
    title: 'Very good blog',
    author: 'Ella T',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0
  }

const noUrl =
  {
    id: '907942jhkh53u529',
    title: 'Very good blog',
    author: 'Ella T',
    __v: 0
  }

describe('when there are initial blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  test('Blog id field is called id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(x => {
      expect(x.id).toBeDefined()
    })
  })
  test('Post appends list of blogs', async () => {
    await api.post('/api/blogs').send(extraBlog)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlogs.length + 1)
  })
})

describe('when blog db is empty', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('Posting no likes is zero likes', async () => {
    await api.post('/api/blogs').send(noLikes)
    const res = await api.get('/api/blogs')
    const blog = res.body[0]
    expect(blog.likes).toBe(0)
  })
  test('Posting no url gives bad request', async () => {
    await api.post('/api/blogs', noUrl)
    await api.get('/api/blogs').expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})