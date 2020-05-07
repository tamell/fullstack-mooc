import React, { useState } from 'react'

const BlogForm = ({addBlogfunc}) => {
  
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('') 

    const createBlog = (event) => {
      event.preventDefault()
      addBlogfunc({
        author: author,
        url: url,
        title: title
      })
      setUrl('')
      setTitle('')
      setAuthor('')
    }
    return(
    <>
    <form onSubmit={createBlog}>
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
      </>)
}

export default BlogForm