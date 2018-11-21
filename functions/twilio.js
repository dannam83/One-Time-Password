const twilio = require('twilio');
const { accountSid, authToken } = require('./twilioAuth');

module.exports = new twilio.Twilio(accountSid, authToken);
