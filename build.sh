#!/bin/bash

esbuild lib/fabric.postit.js --bundle --format=cjs --outfile=dist/fabric.postit.js
esbuild lib/fabric.postit.js --bundle --minify --format=cjs --outfile=dist/fabric.postit.min.js

copy="/* Copyright $(date +'%Y') WebGear and EvoStack. All rights reserved. */"
echo "$copy" | cat - dist/fabric.postit.js > temp && mv temp dist/fabric.postit.js
echo "$copy" | cat - dist/fabric.postit.min.js > temp && mv temp dist/fabric.postit.min.js
