const arc = require('@architect/functions')
const indeed = require('indeed-scraper')
const AWS = require('aws-sdk')

function handler(event, callback) {
  const s3 = new AWS.S3()

  const queryOptions = {
    query: 'Haskell',
    jobType: 'contract',
    maxAge: '30',
    sort: 'date',
    limit: '1000'
  }

  let jobLinks = ""
  let lengthCheck = 0

  indeed.query(queryOptions).then(res => {
    if (res === undefined || res.length == 0) {
      jobLinks += 'Empty Indeed Search'
    } else {
      res.forEach(function(job) {
        lengthCheck++
        jobLinks += `<div class="alert alert-primary show"><a href=${job.url}>${job.title}</a><p>${job.company} | ${job.location}</p></div>\n`
        if (lengthCheck === res.length) {
          uploadHtml()
        }
      })
    }
  })

  function uploadHtml() {
      const currentTime = new Date()
      const html = `<!doctype html>
<html>
  <head>
    <title>Serverless Job Search</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Serverless Job Search</h1>
      <p class="text-center">Last Updated: ${currentTime.toTimeString()}</p>
      ${jobLinks}
    </div>
  </body>
</html>
`

    s3.putObject({
      Bucket: 'production-job-search-html',
      Key: 'index.html',
      Body: html,
      ContentType: 'text/html',
      ACL: 'public-read'
    }, function(res) {
      callback()
    })
  }
}

exports.handler = arc.scheduled(handler)
