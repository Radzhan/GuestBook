import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: {
    host:'localhost', user: 'root', password: 'rad123bay', database: 'ofice'
  }
};

export default config;