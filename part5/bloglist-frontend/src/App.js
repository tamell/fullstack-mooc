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
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('') 

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
      setUser(user)
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
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) =>{
    const blogObject = {
      author: author,
      url: url,
      title: title,
      user: user
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setUrl('')
        setTitle('')
        setAuthor('')
      })
    console.log(blogs)
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
  const newBlogForm = () => {
    return(
    <>
    <form onSubmit={addBlog}>
          <div>
             title:
             <input
                type="text" 
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
          </div> 
          <div>
             author:
             <input
                type="text" 
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
             url:
             <input
                type="text" 
                value={url}
                name="URL"
                onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type='submit'>create</button>
        </form>
      </>
    )
  }
  const ShowUser = () => {
    return(
      <>
       {user.name} is logged in
        <button onClick={handleLogout}> logout </button>
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
      <p></p>
      {user !== null && ShowBlogs()}
      {user !== null && <h2>Save a new blog</h2>}
      {user !== null && newBlogForm()}
    </div>
  )
}

export default App