const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
  const token = getTokenFrom(request)
  if (body.title === undefined || body.url === undefined){
    console.log('Oops, missing title or url')
    response.status(400).end()
  }
  else{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      'url': body.url,
      'title': body.title,
      'author': body.author === undefined ? 'author not named' : body.author,
      'likes': body.likes === undefined ? 0 : body.likes,
      'user': user.id
    })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)
  const token = getTokenFrom(request)
  if (body.title === undefined || body.url === undefined){
    console.log('Oops, missing title or url')
    response.status(400).end()
  }else{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = {
      'title': body.title,
      'url': body.url,
      'author': body.author,
      'likes': body.likes === undefined ? 0 : body.likes,
      'user': body.user.id
    }
    console.log(request.params.id)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  console.log(token)
  const decodedtoken = jwt.verify(token, process.env.SECRET)
  console.log('Successfully decded decodedtoken')
  if (!token || !decodedtoken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log('Deletion token is valid')
  const delBlog = await Blog.findById(request.params.id)

  if (delBlog.user.toString() === decodedtoken.id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(400).end()
  }
})
module.exports = blogRouter