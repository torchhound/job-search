let arc = require('@architect/functions')
let indeed = require('indeed-scraper')
let AWS = require('aws-sdk')

function handler(event, callback) {
  AWS.config.update({region: 'us-east-2'})
  let s3 = new AWS.S3()

  const queryOptions = {
    query: 'Haskell',
    jobType: 'fulltime',
    maxAge: '30',
    sort: 'date',
    limit: '100'
  };

  var html = `
    <!doctype html>
    <html>
      <head>
        <title>Serverless Job Search</title>
        <script src="//cdn.jsdelivr.net/npm/microlinkjs@latest/umd/microlink.min.js"></script>
      </head>
      <script>
        microlink('a')
      </script>
      <body>
      ${
        indeed.query(queryOptions).then(res => {
          if (res === undefined || res.length == 0) {
            console.log('Empty Indeed Search')
          } else {
            console.log(res)
            res.map(job => '<a href=' +  job.url + '>Haskell Job</a>')
          }
        })
      }
      </body>
    </html>
  `

  s3.putObject({
    Bucket: 'production-job-search-html',
    Key: 'index.html',
    Body: html,
    ContentType: 'text/html'
  }, function(res) {
    callback()
  })
}

exports.handler = arc.scheduled(handler)
