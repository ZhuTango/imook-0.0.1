var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/imook')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('imook started on port ' + port)


//index page
app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    console.log(JSON.stringify(movies))
    res.render('index', {
      title: 'imook 首页',
      movies: movies
    })
  })
})

//detail page
app.get('/movie/:id', function (req, res) {
  var id = req.params.id
  Movie.findById(id, function (err, movie) {
    res.render('detail', {
      title: 'imooc' + movie.title,
      movie: movie
    })
  })
})

//admin page
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})


//admin update movie
app.get('/admin/update/:id', function (req, res) {
  var id = req.params.id
  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie

      })
    })
  }
})

//admin post movie
app.post('/admin/movie/new', function (req, res) {
  //console.log(JSON.stringify(req.body))
  var id = req.body._id
  //console.log(req.body.movie)/
  var movieObj = req.body
  var _movie = new Movie()
  console.log("id: " + id)
  if (id !== "undefined") {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(movie, movieObj)
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
     console.log(JSON.stringify(_movie))
    _movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/' + movie._id)
    })
  }
})

//list page
app.get('/admin/list', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: 'imook 首页',
      movies: movies
    })
  })
})

//list delete movie
app.delete('/admin/list', function(req, res){
  var id = req.query.id //获取?传值内容
  //console.log("*****" + JSON.stringify(req.query))
  
  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err)
      }else{
        res.json({success: 1})
      }
      
    })
  }
})