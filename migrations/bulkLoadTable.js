const AWS = require('aws-sdk');
const users = require('../statics/users.json');
const songs = require('../statics/songs.json');
const albums = require('../statics/albums.json');
const albumSong = require('../statics/albumSong.json');
const userAlbum = require('../statics/userAlbum.json');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();

[users, songs, albums, albumSong, userAlbum].forEach((data) => {
  const params = {
    RequestItems: {
      "audio-player": data.map((item) => (
        { PutRequest: { Item: item }, }
      )),
    },
  };
  
  dynamodb.batchWriteItem(params, (err, data) => {
    if (err) console.log("Error", err);
    else console.log("Success", data);
  });
});
