const config = {
  port: process.env.APP_PORT || 5000,
  host: process.env.APP_HOST || 'http://localhost',
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
};

export default config;
