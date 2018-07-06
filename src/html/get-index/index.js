let arc = require('@architect/functions')
let AWS = require('aws-sdk')

function route(req, res) {
  let s3 = new AWS.S3()
  var bucket
  if (process.env.NODE_ENV === 'production') {
    bucket = 'production-job-search-html'
  } else if (process.env.NODE_ENV === 'staging') {
    bucket = 'staging-job-search-html'
  }
  var getParams = {
    Bucket: bucket,
    Key: 'index.html'
  }

  s3.getObject(getParams, function(err, data) {
    if (err)
      console.log(err)
    res({html: data.Body.toString()})
  });
}

exports.handler = arc.html.get(route)
