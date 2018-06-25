let arc = require('@architect/functions')

function route(req, res) {
  res({html: req._static('/index.html')})
}

exports.handler = arc.html.get(route)
