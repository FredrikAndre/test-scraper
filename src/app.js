const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((article) => {
      const articleItem =
        `<div><h3>` +
        article.title +
        `</h3><p>` +
        article.newsUrl +
        `</p></div>`
      feedDisplay.insertAdjacentHTML('beforeend', articleItem)
    })
  })
  .catch((err) => console.log(err))
