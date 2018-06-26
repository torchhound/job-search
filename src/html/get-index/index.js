let arc = require('@architect/functions')
let AWS = require('aws-sdk')

function route(req, res) {
  let s3 = new AWS.S3()
  var getParams = {
    Bucket: 'production-job-search-html',
    Key: 'index.html'
  }

  s3.getObject(getParams, function(err, data) {
    if (err)
      console.log(err)
    res({html: data.Body.toString()})
  });
}

exports.handler = arc.html.get(route)
