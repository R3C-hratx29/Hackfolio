const Auth = {};

Auth.isLoggedIn = (req, res, next) => {
  if (req.headers.jwt || req.path === '/auth') {
    next();
  } else {
    res.set(302);
    res.redirect('/');
  }
};

module.exports = Auth;
