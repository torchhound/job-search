module.exports = function bucket(environment) {
  if (environment === 'production') {
    return 'production-job-search-html'
  } else if (environment === 'staging') {
    return 'staging-job-search-html'
  }
}