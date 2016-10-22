<h1 align="center">
  <br>
  <img src="build/Conda-menu.png" alt="Condamenu" width="200"></a>
  <br>
    Conda-menu
  <br>
  <br>
</h1>
<h4 align="center">An (unofficial) menubar app for creating and launching conda virtual environments.</h4>
<p align="center">
  <a href="https://travis-ci.org/twbattaglia/conda-menu"><img src="https://travis-ci.org/twbattaglia/conda-menu.svg?branch=master" alt="Travis"></a>
  <a href="https://github.com/twbattaglia/conda-menu/releases"><img src="https://img.shields.io/github/release/twbattaglia/conda-menu.svg" alt="Release"></a>
</p>

## Install
Download the latest version for your platform from [releases](https://github.com/twbattaglia/conda-menu/releases).
Currently **Conda-menu** only supports macOS and is under very active development.


## Screenshots
<div align="center">
  <br>
  <img src="build/screenshots/screenshot-drag.gif" alt="screenshot" align="center">
  <br>
  <img src="build/screenshots/screenshot-main.png" alt="screenshot" align="center">
  <br>
  <img src="build/screenshots/screenshot-create.png" alt="screenshot" align="center">
  <br>
  <img src="build/screenshots/screenshot-clone.png" alt="screenshot" align="center">
  <br>
  <img src="build/screenshots/screenshot-delete.png" alt="screenshot" align="center">
  <br>
</div>

## Requirements
To load or create any new conda environments, you must have anaconda/miniconda installed first. If you do not have anaconda installed, see https://www.continuum.io/downloads#osx to download the GUI installation or run the command below to install miniconda through the command-line.
```
# Download Python 3.6
curl https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh

# Download Python 2.7
curl https://repo.continuum.io/miniconda/Miniconda2-latest-MacOSX-x86_64.sh
bash Miniconda2-latest-MacOSX-x86_64.sh
```

## Development
```bash
# Install latest Electron (if needed)
npm install electron -g

# Download latest directory
git clone https://github.com/twbattaglia/conda-menu

# Change directory
cd conda-menu/

# Install npm packages
npm install

# start app
npm run dev
```

## Powered By
Electron: http://electron.atom.io/)  
Node.js : https://nodejs.org)  
(Continuum Analytics, Inc.) Conda AP: https://github.com/conda/conda-api  
Electron-Menubar: https://github.com/maxogden/menubar  
App Icon: Ouroboros by Silas Reeves from the Noun Project  

## Future features
- [x] validate conda installation
- [x] add option to import requirements.yaml file during new env creation  
- [ ] upload env's to anaconda
- [x] export env's to YML
- [x] clone env's
- [ ] change/set default Terminal program
- [ ] add new anaconda channels
- [x] option to open app at startup
- [ ] github auto-updates
- [ ] add homebrew installation
- [ ] add support for linux
- [ ] add support for windows
