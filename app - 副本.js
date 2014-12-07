var express = require('express')
var path = require('path')
var mongoose = requier('mongoose')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()
var bodyParser = require('body-parser')

mongoose.connect('mondodb://localhost/imook')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imook started on port ' + port)

//index page
app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err)[
      console.log(err)
      ]
  })
  res.render('index', {
    title: 'imooc 首页',
    movies: [{
      title: '机械战警',
      _id: 1,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }, {
      title: '机械战警',
      _id: 2,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }, {
      title: '机械战警',
      _id: 3,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }, {
      title: '机械战警',
      _id: 4,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }, {
      title: '机械战警',
      _id: 5,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }, {
      title: '机械战警',
      _id: 6,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg'
    }]
  })
})

//detail page
app.get('/movie/:id', function (req, res) {
  res.render('detail', {
    title: 'imooc 详情页',
    movie: {
      doctor: '何塞·帕迪里亚',
      country: 'America',
      title: '机械战警',
      year: 2014,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg',
      language: 'English',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典、由《精英部队》导演何塞·帕迪利亚知道的新版《机械战警》。'
    }
  })
})

//admin page
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      doctor: '',
      country: '',
      title: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: ''
    }
  })
})

//list page
app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: 'imooc 列表页',
    movies: [{
      doctor: '何塞·帕迪里亚',
      country: 'America',
      title: '机械战警',
      year: 2014,
      poster: 'http://img1.cache.netease.com/catchpic/F/F3/F36C26282AF1E9A293E74B84328A3E34.jpg',
      language: 'English',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典、由《精英部队》导演何塞·帕迪利亚知道的新版《机械战警》。'
    }]
  })
})