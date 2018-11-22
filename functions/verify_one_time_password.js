const admin = require('firebase-admin');

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided'});
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = Number(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', snapshot => {
        // turn off refs in google cloud functions to stop listening
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ user, error: 'Code not valid'})
        }

        ref.update({ codeValid: false })
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token: token }))
          .catch(err => res.send({
            message: 'Error creating custom token',
            error: err }))
        return null;
      });
      return null;
    })
    .catch((err) => res.status(422).send({
      message: 'Error setting up user to validate token',
      error: err }))
    return null;
}
