const twilio = require('twilio');
const accountSid = require('./twilioAccountSid');
const authToken = require('./twilioAuthToken');

module.exports = new twilio.Twilio(accountSid, authToken);
