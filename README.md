# job-search

Serverless job scraping function built with [architect](https://arc.codes/).

# Install

`npm install @architect/workflows`

`npm install`

# Run

`export AWS_PROFILE=YOUR_PROFILE`

`export AWS_REGION=YOUR_AWS_REGION`

`npx create`

# Deploy

Run this to deploy `.arc-config` to your Lambdas: `npx config`

`export ARC_DEPLOY=production`

Run this to update and install all the `node_modules` in `src/`: `npx hydrate`

`npx deploy`