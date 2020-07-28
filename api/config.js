let config = {};

config.db = 'mysql://bc95ef36a6368d:ed521b8d@eu-cdbr-west-03.cleardb.net/heroku_320ea454d13588a';
config.port = process.env.PORT || 4000;
config.host = 'localhost';//'192.168.100.6'//
config.secret = 'secret shhh...';
config.defaultAvatar = 'path/to/avatar';
config.email = 'noreply.fichub@gmail.com';
config.emailPassword = 'QwErTy123';
config.apiUrl = 'http://fichub-api.herokuapp.com'//'http://localhost:4000';
config.clientUrl = 'https://fichub.herokuapp.com'//'http://192.168.100.6:8080';
config.cloudinary = 'cloudinary://442361569433217:DfxYmZ2z0gK1CGJoiTOUXGZ-4oM@hlepcebdv';

module.exports = config;