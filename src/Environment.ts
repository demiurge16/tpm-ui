
export const environment = {
  apiUrl: import.meta.env.REACT_APP_TPM_API_URL || 'http://26.44.49.6:8080/api/v1',
  authServerUrl: import.meta.env.REACT_APP_AUTH_SERVER_URL || 'http://26.44.49.6:8081',
  authServerRealm: import.meta.env.REACT_APP_AUTH_SERVER_REALM || 'tpm',
  env: import.meta.env.REACT_APP_TPM_ENV || 'dev',
  version: import.meta.env.REACT_APP_VERSION || '0.0.0',
}
