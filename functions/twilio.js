const twilio = require('twilio');
const accountSid = require('./twilioAccountSid')
const authToken = require('./twilioAuthToken');

// const accountSid = 'ACd6966607c1a06b591d955a2dbee4f655';
// const authToken = '23b0b25b074ad5e741c022895bfcd7bb';

module.exports = new twilio.Twilio(accountSid, authToken);
