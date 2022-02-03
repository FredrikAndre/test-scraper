const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')
const PORT = 8000

const app = express()
app.use(cors())

const url = 'https://www.theguardian.com/international'

app.get('/', function (req, res) {
  res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      const articles = []

      $('.fc-item__title', html).each(function () {
        const title = $(this).text()
        const newsUrl = $(this).find('a').attr('href')
        articles.push({
          title,
          newsUrl,
        })
      })
      res.json(articles)
    })
    .catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
