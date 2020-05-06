const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  console.log('Started adding user...')
  if (body.password === undefined || body.password.length < 3 ){
    return response.status(200).json({ error: 'password missing or too short' })
  }else{
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    console.log(user)
    const savedUser = await user.save()
    response.json(savedUser)
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1 })
  response.json(users.map(user => user.toJSON()))
})
module.exports = userRouter