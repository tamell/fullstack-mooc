import React, {useState} from 'react'
const Blog = ({ blog, putBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const hideWhenVisible = { display: blogVisible ? 'none' : '',
                            paddingTop: 10,
                            paddingLeft: 2,
                            border: 'solid',
                            borderWidth: 1,
                            marginBottom: 5 }
  const showWhenVisible = { display: blogVisible ? '' : 'none',
                            paddingTop: 10,
                            paddingLeft: 2,
                            border: 'solid',
                            borderWidth: 1,
                            marginBottom: 5 }
  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }
  const handleLike = () =>{
    console.log('Liked')
    const newBlog = blog
    newBlog.likes += 1
    putBlog(newBlog)
  }
  console.log(blog)
  return(
    <>
  <div style={hideWhenVisible}>
    {blog.title} {blog.author} 
    <button onClick={toggleVisibility}>view</button>
  </div>
  <div style={showWhenVisible}>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>hide</button>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.user.name}</p>
   </div>
   </>
)}

export default Blog
