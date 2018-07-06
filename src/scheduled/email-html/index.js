let arc = require('@architect/functions')
let nodemailer = require('nodemailer')
let AWS = require('aws-sdk')

function handler(event, callback) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
  });

  let s3 = new AWS.S3()

  let getParams = {
    Bucket: 'production-job-search-html',
    Key: 'index.html'
  }

  s3.getObject(getParams, function(err, data) {
    if (err) {
      console.log(err)
      callback()
    } else {
      let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Updated Job Search!`,
        html: data.Body.toString()
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      })

      callback()
    }
  }) 
}

exports.handler = arc.scheduled(handler)