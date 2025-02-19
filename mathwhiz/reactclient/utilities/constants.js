const API_BASE_URL_DEVELOPMENT = 'https://localhost:7160';
const API_BASE_URL_PRODUCTION = 'https://appname.azurewebsites.net';

const ENDPOINTS = {
    POST_FUNCTION: 'post-function'
};

const development = {
    API_POST_FUNCTIONL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.POST_FUNCTION}`
};

const production = {
    API_POST_FUNCTIONL: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.POST_FUNCTION}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : production;

export default Constants;
