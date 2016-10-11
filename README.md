# conda-menu
An Electron based menubar app for creating and launching conda virtual environments.

# Why
I don't know.

# Requirements
To load or create any new conda environments, you must have anaconda/miniconda installed first. If you do not have anaconda installed, see https://www.continuum.io/downloads#osx to download the GUI installation or run the command below to install miniconda through the command-line.
```bash
# Download Python 3.6
curl https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh -b

# Download Python 2.7
curl https://repo.continuum.io/miniconda/Miniconda2-latest-MacOSX-x86_64.sh
bash Miniconda2-latest-MacOSX-x86_64.sh -b
```

# Usage
Download the latest .app in the releases  
https://github.com/twbattaglia/conda-menu/releases/  

# Development
```
# install latest electronjs (if needed)
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

# Credits

Conda API: https://github.com/conda/conda-api (Continuum Analytics, Inc.)  
Electron-Menubar: https://github.com/maxogden/menubar  
App Icon: Ouroboros by Silas Reeves from the Noun Project  

# (Hopeful) future features
- [ ] validate conda installation
- [ ] add option to import requirments.yaml file during new env creation  
- [ ] upload/export env's
- [ ] change/set default Terminal program
- [ ] add new anaconda channels
- [ ] option to open app at startup
- [ ] github auto-updates