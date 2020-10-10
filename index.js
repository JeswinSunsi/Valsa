// Imports - MongoDB, the Url Schema, Express, Fs
mongoose = require('mongoose');
require('./models/Url');
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv').config();


const DATABASE = process.env.DATABASE

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log("Mongoose: Something went wrong -> " + err.message);
});

mongoose.connection.once('open', () => {
  console.log("Database connected");
});


const Url = mongoose.model('Url');

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET request for home.html
app.get('/', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile('./views/home.html', null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write('Route not found!');
      } else {
        res.write(data);
      }
      res.end();
    });
})

// GET request for result.html
app.get('/result', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./views/result.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Route not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
})

// GET request to redirect the shortened URL to the origin
app.get('/:route', async (req, res) => {
  const route = req.params.route;
  const instance = await Url.findOne({id: route});
  if(instance) {
    await instance.save();
    res.redirect(''+instance.url+'')
  } else {
    res.send("404")
  }
})

app.post('/', async (req, res) => {
  const url = req.body.url;
  const instance = new Url({ url: url });
  short = JSON.stringify(instance._id)
  const id = short.slice(short.length-7, short.length-1)
  instance.id = id;
  await instance.save()
  res.send({
    message: `${id} was created`,
    url: `${id}`,
  });
})

// create Routes
app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on port 8000');
  })