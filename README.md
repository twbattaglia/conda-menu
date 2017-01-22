<h1 align="center">
  <br>
  <img src="build/screenshots/Conda-menu.png" alt="Condamenu" width="200"></a>
  <br>
    Conda-menu
  <br>
  <br>
</h1>
<h4 align="center">An (unofficial) menubar app for creating and launching conda virtual environments.</h4>
<p align="center">
  <a href="https://travis-ci.org/twbattaglia/conda-menu"><img src="https://travis-ci.org/twbattaglia/conda-menu.svg?branch=master" alt="Travis"></a>
  [![Build status](https://ci.appveyor.com/api/projects/status/bk171v1wdtog12nv/branch/master?svg=true)](https://ci.appveyor.com/project/twbattaglia/conda-menu/branch/master)
  <a href="https://github.com/twbattaglia/conda-menu/releases"><img src="https://img.shields.io/github/release/twbattaglia/conda-menu.svg" alt="Release"></a>
</p>

## Install
Download the latest version for your platform from [releases](https://github.com/twbattaglia/conda-menu/releases). Currently **Conda-menu** only supports macOS and Windows, and is under very active development.

### macOS
1. Download the latest macOS (.DMG) in [releases.](https://github.com/twbattaglia/conda-menu/releases)  
2. Move .app to the /Applications folder
3. Run .app

### Windows
1. Download the latest (.EXE) in [releases.](https://github.com/twbattaglia/conda-menu/releases)  
3. Run .exe

## Requirements
To launch or create any new conda environments, you must have **Anaconda** or **Miniconda** installed and set as the system default Python. If you do not have **Anaconda** installed, visit https://www.continuum.io/downloads to download the GUI installer for macOS or Windows. Or for a slimmed down version, you can install Miniconda (http://conda.pydata.org/miniconda.html).  

## Screenshots
<div align="center">
  <img src="build/screenshots/main.png" alt="screenshot" align="center">
  <img src="build/screenshots/create.png" alt="screenshot" align="center">
  <img src="build/screenshots/remove.png" alt="screenshot" align="center">
  <img src="build/screenshots/export.png" alt="screenshot" align="center">
</div>

## Development
```bash
# Install latest Electron
npm install electron -g

# Download latest directory
git clone https://github.com/twbattaglia/conda-menu

# Change directory
cd conda-menu/

# Install npm packages
npm install

# Start app
npm run dev
```

## Powered By
Electron: http://electron.atom.io/  
Node.js : https://nodejs.org  
Bootstrap4 : https://v4-alpha.getbootstrap.com/  
AngularJS : https://angularjs.org/  
(Continuum Analytics, Inc.) Conda API: https://github.com/conda/conda-api  
Electron-Menubar: https://github.com/maxogden/menubar  
App Icon: Ouroboros by Silas Reeves from the Noun Project  
