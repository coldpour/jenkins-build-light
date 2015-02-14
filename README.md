Jenkins Build Light
===================

Webapp that displays the status of several jenkins jobs even across multiple servers

To Hack
-------

```bash
git clone https://github.com/coldpour/jenkins-build-light.git
cd jenkins-build-light
npm install
bin/proxy.js &
npm start
```

Then visit http://localhost:8080.

This runs the webpack dev server, any changes you make to javascript or css
files in `src` will cause the browser to reload live. The proxy server code
will not live reload however, so any changes you make there will need to bounce the proxy.

