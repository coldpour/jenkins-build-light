# Jenkins Build Light

Webapp that displays the status of several jenkins jobs even across multiple servers.

![Screenshot](Screenshot.png)

## Usage

### Light Colors

* Green - last build succeeded
* Red - last build failed
* Grey - one of: last build was aborted, build is disabled, build has never run
* Flashing - build is in progress

### Add Build Lights

Each build that you add will add a light to the grid that polls the jenkins server every 5 seconds for updates.

* Click the plus button in the top right corner.
* In the input box that appears, type the url of the job you want the light to track.
* Either hit Enter or click the plus button again.

### Remove Build Lights

Sometimes a light is no longer interesting, or you messed up the URL when you added it.

* Hover over a build light until an 'x' appears in the top right corner of the light.
* Click the 'x'.

### Save or Share a View

The lights you've added get put up in the URL, so to save the View you've set up, simply bookmark the page and it will load the same lights next time. To share your view, copy and paste the URL.

## Running Your Own Build Light

jenkins-build-light needs network access to your Jenkins servers, so if they're on a private network, you're going to want to deploy jenkins-build-light on your private network.

### With Docker

[![Docker Pulls](https://img.shields.io/docker/pulls/coldpour/jenkins-build-light.svg)](https://hub.docker.com/r/coldpour/jenkins-build-light/)

```bash
docker run -d -P -t coldpour/jenkins-build-light
```

### From Source

```bash
git clone https://github.com/coldpour/jenkins-build-light.git
cd jenkins-build-light
npm install
npm start
```

Then visit [http://localhost:8080](http://localhost:8080).

## Contribute

I'm tracking my work on my waffle board. [![Stories in Ready](https://badge.waffle.io/coldpour/jenkins-build-light.png?label=ready&title=Ready)](https://waffle.io/coldpour/jenkins-build-light)

Run the app as the "From Source" instructions indicate. After you make changes, press CTRL+C and rerun `npm start`.
