const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const likeArray = blogs.map(x => x.likes)
  const likeSum = likeArray.reduce((x,y) => x+y,0)
  return likeSum
}
const favoriteBlog = (blogs) => {
  const likeArray = blogs.map(x => x.likes)
  const maxIndex = likeArray.indexOf(Math.max(...likeArray))
  const maxBlog = blogs[maxIndex]

  return maxBlog
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}