require("dotenv").config();
module.exports = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: "openid profile offline_access",
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    REDIRECT_URI:
      process.env.REDIRECT_URI || "http://localhost:8080/api/callback",
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || "http://localhost:8080/",
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME || 7200,
  },
  webpack(config) {
    // This allows us to import "pg" for SSR, but ignore it on the client
    config.externals = [...config.externals, "pg"];
    return config;
  },
};
