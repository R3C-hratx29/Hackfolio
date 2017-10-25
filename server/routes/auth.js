const Auth = {};

Auth.isLoggedIn = (req, res, next) => {
  if (req.headers.jwt || req.path === '/auth') {
    next();
  } else {
    res.status(401).send({ error: 'Not logged in.' });
    res.redirect('/');
  }
};

module.exports = Auth;
