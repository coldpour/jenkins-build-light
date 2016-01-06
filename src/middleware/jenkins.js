var jenkinsapi = require('jenkins-api');
var patchUrl = require('url-patch');

var parseJob = (query) => {
  var prefix = '/';
  if(query.startsWith(prefix)) {
    query = query.substring(prefix.length, query.length);
  }
  
  return objectifyJob(query);
};

var parseUrl = (job) => {
  return job.substring(0, job.lastIndexOf('/job/'));
};

var parseName = (job) => {
  return job.substring(job.lastIndexOf('/job/') + 5, job.length);
};

var objectifyJob = (job) => {
  return {
    url: job,
    patchedUrl: patchUrl(parseUrl(job)),
    name: parseName(job)
  };
};

var getJob = (job, cb) => {
  var jenkins = jenkinsapi.init(job.patchedUrl);
  var jobInfo = {
    job: undefined,
    lastBuild: undefined,
    url: job.url
  };

  jenkins.job_info(job.name, (err, data) => {
    jobInfo.job = data;
    jenkins.last_build_info(job.name, (err, data) => {
      jobInfo.lastBuild = data;
      cb(err, jobInfo);
    });
  });
};

module.exports = (req, res, next) => {
  var job = parseJob(req.url);
  getJob(job, (err, results) => {
    res.send(JSON.stringify(results));
    next();
  });
};
