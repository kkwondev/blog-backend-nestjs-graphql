import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  database: process.env.DBNAME || 'kbloglocal',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  host: process.env.DB_ENDPOINT || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'whosegoods',
};

export default connectionOptions;
