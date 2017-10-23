const Auth = {};

Auth.isLoggedIn = (req, res, next) => {
  (req.headers.jwt || req.path==='/auth') ? next() : res.redirect('/signup');
};

module.exports = Auth;
