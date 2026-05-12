export default () => ({
  port: {
    server: parseInt(process.env.PORT_SERVER || '4000', 10),
    client: parseInt(process.env.PORT || '3008', 10),
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/DBSpotify',
  },
  jwt: {
    secret:
      process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '3d',
  },
  deezer: {
    apiUrl: 'https://api.deezer.com',
  },
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || 'http://localhost:3008'
        : `http://localhost:${process.env.PORT || '3008'}`,
  },
});
