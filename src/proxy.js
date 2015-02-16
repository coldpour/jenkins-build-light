(() => {
  var http = require('http');
  var jenkins = require('jenkins');
  var async = require('async');
  var PROXY_PORT = require('./Constants.js').PROXY_PORT;

  var patchProtocol = (url) => {
    var protocolStr = 'http://';
    if(!url.startsWith(protocolStr)) {
      url = protocolStr + url;
    }
    return url;
  };

  var patchTrailingSlash = (url) => {
    var lastIndex = url.length-1;
    if(url.endsWith('/')) {
      url = url.substr(0, lastIndex);
    }
    return url;
  };

  var patchUrl = (url) => {
    return patchProtocol(patchTrailingSlash(url));
  };

  var parseJobs = (query) => {
    // console.log('parsing query', query);

    if(query.startsWith('/q=')) {
      query = query.substring(3, query.length);
    }
    
    return query.split('&').map(patchUrl).reduce(objectifyJobs, []);
  };

  var parseUrl = (job) => {
    return job.substring(0, job.lastIndexOf('/job/'));
  };

  var parseName = (job) => {
    return job.substring(job.lastIndexOf('/job/') + 5, job.length);
  };

  var objectifyJobs = (prev, curr, i, arr) => {
    return prev.concat([{
      url: parseUrl(curr),
      name: parseName(curr)
    }]);
  };

  var getJob = (job, cb) => {
    // console.log('getting job', job);
    
    jenkins(job.url).job.get(job.name, (err, data) => {
      cb(err, data);
    });
  };

  var sendResponseJSON = (response, results) => {
    // console.log('sending results', results);
    response.writeHead(200, { 'Content-Type': 'text/plain',
                              'Access-Control-Allow-Origin': '*' });
    response.end(JSON.stringify(results));
  };

  var server = http.createServer((req, res) => {
    var jobs = parseJobs(req.url);
    async.map(jobs, getJob, (err, results) => {
      sendResponseJSON(res, results);
    });

  }).listen(PROXY_PORT);
  console.log('Server listening on http://localhost:'+PROXY_PORT+'/');

})();
