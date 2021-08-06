require("dotenv").config();
const env = process.env;
const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT || 3306,
};
const production = {
  test: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: "mysql",
    port: env.MYSQL_PORT || 3306,
  },
};
const test = {
  production: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: "mysql",
    port: env.MYSQL_PORT || 3306,
  },
};
// 현재 작동 안되는 것으로 보임
const jwt = { 
  secret: env.SECRET_KEY,
  expiresIn: env.EXPIRES_IN || 86400, // 기본값 24시간

}
module.exports = { development, production, test, jwt };
