# Api

Install dependencies: `npm install`

Start api: `npm run start:dev`

Api listens on port 4000 by default, hit http://localhost:4000/health to see if it's live and kicking

## API Endpoints:

`POST /signup` - it accepts name, email and password. Once it's been verified that there's no user with the given name and email in the database, the name, email and the hashed password is saved in the database and a link with a confirmation key is created and sent back to the user email.

`GET /verify?id={id}&confKey={key}` - it accepts user id and confirmation key. Once it's been verified that there's unconfirmed user with given id and confirmation key, the user's confirmed and redirected to client signin page.

`POST /singin` - it accepts login and password. It checks if the login and password are ok and a JWT token is sent back to the user

`GET /` - in order to access the route you have to include the JWT token in the `authorization` header in the request.

`POST /userUpdate` - in order to access the route you have to include the JWT token in the `authorization` header in the request. It accepts and changes avatar, about, mode and language on an authorized user. Changed avatar, mode and language sent back to user.



`POST /createBook` - in order to access the route you have to include the JWT token in the `authorization` header in the request. It accepts book's name, about, genre, tags and creates a new book.

`POST /updateBook` - in order to access the route you have to include the JWT token in the `authorization` header in the request.It accepts book's id and new name, about, genre, tags and updates the book with given id.

`GET /getBook`
`GET /showBooks`

`POST /createChapter` - in order to access the route you have to include the JWT token in the `authorization` header in the request. It accepts chapter's book, name, story, image and creates a new chapter for the book with given id.

`POST /updateChapter` - in order to access the route you have to include the JWT token in the `authorization` header in the request. It accepts chapter's book and no as well as newNo, name, story, image and changes the chapter with given book and no.

`GET /getChapter`
`GET /showChapters`
