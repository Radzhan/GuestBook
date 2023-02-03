import mysql, { Connection } from 'mysql2/promise'
import config from './confiq';

let connection : Connection | null = null;

const mysqlDb = {
  async init () {
    connection = await mysql.createConnection(config.db);
  },

  getConnection() {
    if (!connection) {
      throw new Error('connection failed');
    }
    return connection;
  },
};

export default mysqlDb;
