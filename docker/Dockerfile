FROM docker.f4tech.com/jenkins/simple-node

RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -

RUN apt-get update
RUN apt-get install -y build-essential nodejs=0.12.9-1nodesource1~trusty1
RUN npm install -f -g npm@2.14.13
