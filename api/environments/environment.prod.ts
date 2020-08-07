require('dotenv').config();
export const environment = {
  name: 'prod',
  common: {
    genericErrorMessage: 'There was a problem. Please try again...',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    timestamp: 60
  },
  password_secret: process.env.PASSWORD_SECRET
}