import { NextApiRequest, NextApiResponse } from 'next';

import dynamodb from '../../../services/db';
import { TABLE_NAME } from '../../../services/config';
import Song, { SongType } from '../../../models/song';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      'PK': { 'S': 'SONG#3134ce5d-a27a-4f38-92ec-e1b9943ca519' }, // eslint-disable-line quote-props
      'SK': { 'S': '#METADATA#3134ce5d-a27a-4f38-92ec-e1b9943ca519' }, // eslint-disable-line quote-props
    },
  };

  dynamodb.getItem(params, (err, data) => {
    if (err) console.log('Error', err); // eslint-disable-line no-console
    else {
      const songData: SongType = { ...data };
      res.status(200).json(Song.serialize(songData));
    }
  });
};
