
export const environment = {
  apiUrl: process.env.REACT_APP_TPM_API_URL || 'http://localhost:8080/api/v1',
  authServerUrl: process.env.REACT_APP_AUTH_SERVER_URL || 'http://localhost:8081',
  authServerRealm: process.env.REACT_APP_AUTH_SERVER_REALM || 'tpm',
  env: process.env.REACT_APP_TPM_ENV || 'dev',
  version: process.env.REACT_APP_VERSION || '0.0.0',
}
