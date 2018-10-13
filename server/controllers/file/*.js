function get(req, res, next) {
  try {
    res.render('index', {
      bundles: ['/polyfill.bundle.js', '/app.bundle.js'],
    });
  } catch (e) {
    next(e);
  } 
}

module.exports = {
  get: get,
};
