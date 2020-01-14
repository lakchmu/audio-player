import dynamodb from '../../../services/db';
import { TABLE_NAME } from '../../../services/config';
import Song from '../../../models/song';

export default (req, res) => {
  var params = {
    TableName: TABLE_NAME,
    Key: {
      'PK': { 'S': 'SONG#3134ce5d-a27a-4f38-92ec-e1b9943ca519' },
      'SK': { 'S': '#METADATA#3134ce5d-a27a-4f38-92ec-e1b9943ca519' },
    },
  };

  dynamodb.getItem(params, (err, song) => {
    if (err) console.log('Error', err);
    else res.status(200).json(Song.serialize(song));
  });
}