import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(async () => {
    const initialBlogs = await blogService.getAll()
    console.log(initialBlogs)
    setBlogs(initialBlogs)
  }, [])
  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      console.log('SuccessfulAwait')
      setUser(user.name)
      setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(user)
    }catch(exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const LoginForm = () => {
    return(
    <>
    <form onSubmit={handleLogin}>
          <div>
             username
             <input
                type="text" 
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div> 
          <div>
             password
             <input
                type="password" 
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type='submit'>log in</button>
        </form>
      </>
    )
  }
  const ShowUser = () => {
    return(
      <>
       {user} is logged in
      </>
    )
  }
  const ShowBlogs = () => {
    return(
      <>
       {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
  }
  return (
    <div>
      {user != null &&<h2>blogs</h2>}
      {user === null && <h2>Log in to application</h2>}
      {user === null && LoginForm()}
      {user !== null && ShowUser()}
      {user !== null && ShowBlogs()}
    </div>
  )
}

export default App