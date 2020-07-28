const db = require('mysql');

// fichub-api clearDB connection
const mysql = db.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net',
  user: 'bc95ef36a6368d',
  password: 'ed521b8d',
  database: 'heroku_320ea454d13588a',
  multipleStatements: true
});

mysql.connect();
/*
// drop users table if exists
mysql.query("DROP TABLE IF EXISTS `users`", (err) => console.log("USERS table has dropped. Errors: ", err));

// create a new users table
mysql.query(`CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name text,
    email text,
    password text,
    confirmed INT,
    confKey text,
    admin INT,
    avatar text,
    language INT,
    mode INT,
    about text,
    PRIMARY KEY (id)
);`, (err) => console.log('USERS table has created. Errors: ', err, '\n'));

// drop books table if exists
mysql.query("DROP TABLE IF EXISTS `books`", (err) => console.log("BOOKS table has dropped. Errors: ", err));

// create a new books table
mysql.query(`CREATE TABLE books (
    id INT AUTO_INCREMENT,
    user text,
    name text,
    about text,
    genre INT,
    tags text,
    upd date,
    rating int,
    PRIMARY KEY (id)
);`, (err) => console.log('BOOKS table has created. Errors: ', err, '\n'));

// drop chapters table if exists
mysql.query("DROP TABLE IF EXISTS `chapters`", (err) => console.log("CHAPTERS table has dropped. Errors: ", err));

// create a new chapters table
mysql.query(`CREATE TABLE chapters (
    id INT AUTO_INCREMENT,
    book INT,
    no INT,
    name text,
    story text,
    image text,
    likes INT,
    PRIMARY KEY (id)
);`, (err) => console.log('CHAPTERS table has created. Errors: ', err, '\n'));
*/
// drop ratings table if exists
mysql.query("DROP TABLE IF EXISTS `ratings`", (err) => console.log("RATINGS table has dropped. Errors: ", err));

// create a new ratings table
mysql.query(`CREATE TABLE RATINGS (
    id INT AUTO_INCREMENT,
    book INT,
    user INT,
    rate INT,
    PRIMARY KEY (id)
);`, (err) => console.log('RATINGS table has created. Errors: ', err, '\n'));

// drop comments table if exists
mysql.query("DROP TABLE IF EXISTS `comments`", (err) => console.log("COMMENTS table has dropped. Errors: ", err));

// create a new comments table
mysql.query(`CREATE TABLE COMMENTS (
    id INT AUTO_INCREMENT,
    book INT,
    user INT,
    comment text,
    PRIMARY KEY (id)
);`, (err) => console.log('COMMENTS table has created. Errors: ', err, '\n'));

// drop likes table if exists
mysql.query("DROP TABLE IF EXISTS `likes`", (err) => console.log("LIKES table has dropped. Errors: ", err));

// create a new likes table
mysql.query(`CREATE TABLE LIKES (
    id INT AUTO_INCREMENT,
    book INT,
    chapter INT,
    user INT,
    PRIMARY KEY (id)
);`, (err) => console.log('LIKES table has created. Errors: ', err));



mysql.end();