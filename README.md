Jenkins Build Light
===================

Webapp that displays the status of several jenkins jobs even across multiple servers

![JenkinsBuildLight](JenkinsBuildLight.png)

To Hack
-------

```bash
git clone https://github.com/coldpour/jenkins-build-light.git
cd jenkins-build-light
npm install
bin/proxy &
npm start
```

Then visit http://localhost:8080/webpack-dev-server/bundle.

This runs the webpack dev server, any changes you make to javascript or css
files in `src` will cause the browser to reload live. The proxy server code
will not live reload however, so any changes you make there will need to bounce the proxy.

Configuration
-------------

For the moment, all configuration lives in `src/app/Constants.js`.

## PROXY
To set up a server that other people can connect to, you'll need to change the `PROXY` to either an IP or a DNS hostname. Leaving the `PROXY=http://localhost` will pretty much only work for local development.

## BUILDS
Configuring the lights that display on your monitor is a matter of changing the urls in the `BUILDS` array. Each entry in that array will be sent to the proxy server which will attempt to fetch data for that url.
