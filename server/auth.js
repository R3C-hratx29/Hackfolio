const Auth = {};

Auth.isLoggedIn = (req, res, next) => {
  if (req.headers.jwt || req.path === '/auth') {
    next();
  } else {
    res.redirect('/signup');
  }
};

module.exports = Auth;
