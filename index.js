let postsArray = []

const form = document.getElementById('post-form')

function renderPosts() {
  let html = ''
  for (let post of postsArray) {
    html += `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <hr />
      `
  }
  document.getElementById('blog-list').innerHTML = html
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then((response) => response.json())
  .then((data) => {
    postsArray = data.slice(0, 5)
    renderPosts()
  })

// get title input & body input, and store it in a variable..

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const postTitle = document.getElementById('post-title').value
  const postBody = document.getElementById('post-area').value

  const data = {
    title: postTitle,
    body: postBody,
  }
  console.log(data)

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
    .then((response) => response.json())
    .then((post) => {
      postsArray.unshift(post)
      renderPosts()
      form.reset()
    })
})
