import dynamodb from '../../../services/db';
import { TABLE_NAME } from '../../../services/config';
import User from '../../../models/user';

export default (req, res) => {
  var params = {
    TableName: TABLE_NAME,
    Key: {
      'PK': { 'S': 'USER#brocksantana@vantage.com' },
      'SK': { 'S': '#METADATA#brocksantana@vantage.com' },
    },
  };

  dynamodb.getItem(params, (err, user) => {
    if (err) console.log('Error', err);
    else res.status(200).json(User.serialize(user));
  });
}