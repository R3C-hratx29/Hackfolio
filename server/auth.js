const Auth = {};

Auth.isLoggedIn = (req, res, next) => {
  if (req.headers.jwt || req.path === '/auth') {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = Auth;
