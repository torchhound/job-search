@app
job-search

@static
staging staging-job-search-html
production production-job-search-html

@html
get /

@scheduled
job-scrape rate(12 hours)