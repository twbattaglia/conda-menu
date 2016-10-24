#!/bin/bash

# err if null
set -e

# Remove exisiting installations
rm -rf dist
mkdir dist

# Change directory into build folder
cd build/

# Build for osx
cd Conda-menu-darwin-x64
zip -9 -r --symlinks conda-menu-mac.zip Conda-menu.app
mv -v conda-menu-mac.zip ../../dist
cd ..

# Build for win32
zip -9 -r --symlinks conda-menu-win32.zip Conda-menu-win32-ia32/*
mv -v conda-menu-win32.zip ../dist

# message complete
echo "Completed"