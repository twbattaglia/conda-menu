#!/bin/bash

set -e

rm -rf dist
mkdir dist

cd build/conda-menu-darwin-x64
zip -9 -r --symlinks conda-menu-mac.zip Conda-menu.app
mv -v conda-menu-mac.zip ../../dist
