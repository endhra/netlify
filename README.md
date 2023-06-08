# C Combinator

## Getting started

* Create your env.development file to add your Twitter Environment Variables
  Get them from Netlify -> Build & deploy -> Environment 

* Serve your website locally on http://localhost:8000

    ```text
    npm run develop
    ```

* Serve your admin locally on http://localhost:8000/admin
    First make sure that ```local_backend: true``` is added to admin/config.yml
    Then run the command to create the netlify server locally:
    ```text
    npx netlify-cms-proxy-server
    ```
    
* Create production build ready to host (/public)

    ```text
    npm run build
    ```

* View the production site locally

    ```text
    gatsby serve
    ```

* Setup Pipeline

For the section with the counter of the CO2 levels we are getting data automatically each week. For this we need to setup a pipeline schedule for the repository, which runs a Python script that fetches the data. 

In order to do this we need to clone a copy of ourselves (the repository checked out in CI) we need SSH and SSH keys set up - those can be generated locally.

The public key needs to be set as a deploy key under Project Settings > Repository > Deploy Keys. You need to enable write access or you won’t be able to have your Git robot push commits. We then need to hand over the private key so that it can be accessed from within the CI job. We’ll use a secret environment variable for that, which you can define under Project Settings > Pipelines > Environment variables. We'll use the environment variable `GIT_SSH_PRIV_KEY` for this.

The pipeline then runs the script inside `.gitlab-ci.yml`. We also need to setup a Schedule for the pipeline to run each week under CI / CD > Schedules. We can create a new schedule with an interval of `00 12 * * 4` - run it each Thursday at 12:00 pm.

* Setup Local Testing Environment 

This is needed for example if we want to test the HubSpot integration. For that we use the `netlify-lambda` package to test Netlify functions locally. To run it locally:

    ```
    npm run start:lambda
    ```

This will start a local server that will handle the requests to Hubspot. That is needed because of CORS problems with a normal request directly from the frontend. Also have in mind that the `process.env variables` are not parsed thorugh this provess so currently they would have to manually be passed instead of taken from the `proces.env`. So for development in order to use the HubSpot api key in the Netlify Functions you would need to manually add it in the function when developing (remember to remove it when pushing code to the repository).