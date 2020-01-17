import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
};

AWS.config.update(serviceConfigOptions);

const dynamodb = new AWS.DynamoDB();

export default dynamodb;
