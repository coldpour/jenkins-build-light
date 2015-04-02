(() => {
  var http = require('http');
  var jenkinsapi = require('jenkins-api');
  var async = require('async');
  var Constants = require('./app/Constants');
  var PROXY = Constants.PROXY;
  var PROXY_PORT = Constants.PROXY_PORT;
  var patchUrl = require('url-patch');

  var parseJob = (query) => {
    if(query.startsWith('/?q=')) {
      query = query.substring(4, query.length);
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

  var sendResponseJSON = (response, results) => {
    response.writeHead(200, { 'Content-Type': 'text/plain',
                              'Access-Control-Allow-Origin': '*' });
    response.end(JSON.stringify(results));
  };

  var server = http.createServer((req, res) => {
    var logMsg = new Date() + ' : ' + req.headers.origin + ' : ' + req.url;
    console.log(logMsg);
    var job = parseJob(req.url);
    getJob(job, (err, results) => {
      sendResponseJSON(res, results);
    });

  }).listen(PROXY_PORT);
  console.log('Server listening on '+PROXY+':'+PROXY_PORT+'/');

})();
