# Api

Install dependencies: `npm install`

Start api: `npm run start:dev`

Api listens on port 4000 by default, hit http://localhost:4000/health to see if it's live and kicking

## API Endpoints:

`POST /signup` - it accepts login and password. Once it's been verified that there's no user with the given login in the database, the login and hashed password is saved in the database and a JWT token is created and sent back to the user

`POST /singin` - it accepts login and password. It checks if the login and password are ok and a JWT token is sent back to the user

`GET /` - in order to access the route you have to include the JWT token in the `authorization` header in the request.
