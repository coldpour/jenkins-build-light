module.exports = (req, res, next) => {
  var logMsg = new Date()
        + '\nreq.ip: ' + req.ip
        + '\nreq.url: ' + req.url
        + '\n';
  console.log(logMsg);
  next();
};
