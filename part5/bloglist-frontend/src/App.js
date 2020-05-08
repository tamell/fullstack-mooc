import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showBlog, setShowBlog] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  
  const blogFormRef = React.createRef()

  useEffect( () => {
    blogService
    .getAll()
    .then(initialBlogs =>
      {console.log(initialBlogs)
        setBlogs(initialBlogs)})
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      console.log('Successful login')
      console.log(blogs)
      setErrorMessage('Successful login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUser(user)
      setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(user)
    }catch(exception){
      setErrorMessage('Error: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (blogObj) => {
    console.log(blogObj)
    blogFormRef.current.toggleVisibility()
    console.log('Going to send blog to service')
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      setErrorMessage('Added new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
  const likeBlog = (blogObj) => {
    console.log(blogObj)
    console.log('Going to send modified blog to service')
    blogService
      .putblog(blogObj)
      .then(returnedBlog =>{
        setErrorMessage('Liked a blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
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
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlogfunc={addBlog} />
    </Togglable>
  )
  const ShowUser = () => {
    return(
      <>
       {user.name} is logged in
        <button onClick={handleLogout}> logout </button>
      </>
    )
  }
  const ShowBlogs = () => {
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    return(
      <>
       {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} putBlog={likeBlog} />
      )}
      </>
    )
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      {user === null && <h2>Log in to application</h2>}
      {user === null && LoginForm()}
      {user !== null && ShowUser()}
      {user!== null && blogForm() }
      <p></p>
      {user != null &&<h2>List of earlier blogs</h2>}
      {user !== null && ShowBlogs()}
    </div>
  )
}

export default App