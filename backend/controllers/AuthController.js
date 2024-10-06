const isAuthenticated = (req, res, next) => {
  if (req.user) {
    res.status(204).send()
  }
  else {
    res.status(401).send()
  }
};

module.exports = {
  isAuthenticated
}
