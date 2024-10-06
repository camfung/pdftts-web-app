const isAuthenticated = (req, res, next) => {
  if (req.user) {
    res.status(204).send()
  }
  else {
    res.status(401).send()
  }
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send()
    })
  })
}

module.exports = {
  isAuthenticated,
  logout
}

