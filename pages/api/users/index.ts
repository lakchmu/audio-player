import { NextApiRequest, NextApiResponse } from 'next';

import dynamodb from '../../../services/db';
import { TABLE_NAME } from '../../../services/config';
import log from '../../../services/logger';
import User, { UserType } from '../../../models/user';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  log.info('GET /users');

  const params = {
    TableName: TABLE_NAME,
    Key: {
      'PK': { 'S': 'USER#brocksantana@vantage.com' }, // eslint-disable-line quote-props
      'SK': { 'S': '#METADATA#brocksantana@vantage.com' }, // eslint-disable-line quote-props
    },
  };

  dynamodb.getItem(params, (err, data) => {
    if (err) console.log('Error', err); // eslint-disable-line no-console
    else {
      const userData: UserType = { ...data };
      res.status(200).json(User.serialize(userData));
    }
  });
};
