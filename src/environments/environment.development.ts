export const environment = {
  production: false,
  auth0Domain: process.env['AUTH0_DOMAIN'] || 'appfyt.us.auth0.com',
  auth0ClientId: process.env['AUTH0_CLIENT_ID'] || 'appfyt.us.auth0.com',
  backendConfigUrl:
    process.env['BACKEND_CONFIG_URL'] || 'http://localhost:3000/config',
  apiUrlBackend: process.env['API_URL_BACKEND'] || 'http://localhost:3000',
};
