const arc = require('@architect/functions')
const AWS = require('aws-sdk')

const bucket = require('@architect/shared/bucket')

function route(req, res) {
  const s3 = new AWS.S3()

  const getParams = {
    Bucket: bucket(process.env.NODE_ENV),
    Key: 'index.html'
  }

  s3.getObject(getParams, function(err, data) {
    if (err)
      console.log(err)
    res({ html: data.Body.toString() })
  })
}

exports.handler = arc.html.get(route)