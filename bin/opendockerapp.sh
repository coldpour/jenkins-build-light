#!/bin/bash

port=$(docker ps -l | grep 0.0.0.0 | sed 's/.*0.0.0.0:\(.*\)->.*/\1/')
ip=$(docker-machine ip default)

open http://${ip}:${port}
