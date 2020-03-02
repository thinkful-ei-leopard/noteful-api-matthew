# Noteful Api

This is the server backend API for the Noteful Client Application

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Migrate the database at `DB_URL`, with `npm run migrate`

Migrate the tests (at `TEST_DB_URL`), with `npm run migrate:test`

Run the test DB migration scripts `npm run migrate:test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.