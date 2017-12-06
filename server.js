var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
//to fix undefined req.body error
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const compiler = webpack(webpackConfig);


//creating a sql database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'referrals',
});
connection.connect();
app.post('/submitRef', function(req, res){
  console.log('submitting something');
  //get data
  console.log(req.body);
  var referral = req.body;
  //do a mysql query
  connection.query('INSERT INTO referral SET ?', [referral], function(err,result){
    if(err){
      console.error(err);
      return;
    }
    console.error(result);
  });
  // send an email directly after we save to database
  //currently configured for gmail
    let transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',//put smtp client of email service provider
      port: 465,
      secure: true,
      auth: {
        //user = actual email address ie: example@gmail.com
        //pass = actual password of email address
        user: '',
        pass: ''
      },
      tls:{
        rejectUnauthorized: false
      }
    });

    //want to somehow loop here through all of the data in the database to send emails
    var person = req.body.refName;
    var firstName = req.body.firstName;
    var personEmail = req.body.email;
    var sentEmailSig = '"%s" <%s>', firstName, personemail;
    var emailBody = "You have been sent an email by "+person;
    var emailHTML = "<p>"+emailBody+"<p>";
    //want to somehow loop here through all of the data in the database to send emails
    let mailOptions = {
      from: '"Auto Mech" <'+user+'>',//sender address should match above user: account.user
      to: req.body.email,
      subject:'You\'ve got mail',
      text: emailBody,
      html: emailHTML
    };

    transport.sendMail(mailOptions,(err, info) =>{
      if(err){
        return console.log(err);
      }
      console.log("Message sent to %s", personEmail);
      // this is only for etheral accounts
      // console.log("Preview URL for email sent is %s", nodemailer.getTestMessageUrl(info));
    });
  //res.send('Yes');
  res.redirect('back');
})

//from guide
app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
