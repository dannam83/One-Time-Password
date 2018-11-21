const admin = require('firebase-admin');

module.exports = function(req, res) {
  // verify the user provided a phone number. 422 for user error.
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // format the phone number
  // regex is selecting anything not a number. actual regex between brackets.
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // create new user with phone number with phone as unique id
  // this is asynchronous so use promises
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
}
