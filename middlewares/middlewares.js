function requireUser (req, res, next) {
  const user = req.session.currentUser;

  if (!user) {
    return res.redirect('/auth/login');
  } else {
    next();
  }
}

function requireAnon (req, res, next) {
  const user = req.session.currentUser;

  if (user) {
    return res.redirect('/profile');
  } else {
    next();
  }
}

function isLogged (req, res, next) {
  const user = req.session.currentUser;

  if (user) {
    return res.redirect('/jams');
  } else {
    next();
  }
}

module.exports = {
  requireUser,
  requireAnon,
  isLogged
};
