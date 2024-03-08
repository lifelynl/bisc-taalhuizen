export const env = {
    // eslint-disable-next-line no-restricted-globals
    apiBasePath: process.env.REACT_APP_API_URL === '/' ? location.origin : process.env.REACT_APP_API_URL,
}
