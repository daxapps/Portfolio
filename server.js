var express = require('express');
var path = require('path');
var sass = require('node-sass-middleware');
var autoprefixer = require('express-autoprefixer');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();

var PORT = process.env.PORT || 3000;
var filePath = path.join(__dirname, 'public');
var sassPath = path.join(__dirname, 'sass');

// mailer smtpTransporter configuration
var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: account.user, 
    pass: account.pass
  }
}));

// set up autoprefixer(this goes before the sass middleware)
app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));

// set up sass middleware to convert scss into css
app.use(
  sass({
    src: sassPath,
    dest: filePath + '/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css' // crucial line to get the css rendered to the right place
  })
);


// set up public directory to serve files
app.use(express.static(filePath));


// root path serves up index.html
app.get('/', function(req, res){
  res.sendFile('index.html');
});

// mailer request
app.get('/send', function(req, res){
  var mailerOptions = {
    to: 'daxapps777@gmail.com',
    from: req.query.email,
    subject: req.query.name,
    text: req.query.content
  };
  console.log(mailerOptions);
  transporter.sendMail(mailerOptions, function(err, info){
    if(err){
      return console.log(err);
    } 
    console.log('Message sent successfully! ' + info.response);
    res.end('sent');
  });
});

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});