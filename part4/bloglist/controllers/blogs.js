const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  console.log('Going to find blogs')
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.body.authorization
  if (body.title === undefined || body.url === undefined){
    response.status(400).end()
  }
  else{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      'url': body.url,
      'title': body.title,
      'author': user.id,
      'likes': body.likes === undefined ? 0 : body.likes,
    })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.body.token
  const decodedtoken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedtoken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const delBlog = await Blog.findById(request.params.id)

  if (delBlog.author.toString() === decodedtoken.id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(400).end()
  }
})
module.exports = blogRouter