// Required modules
var menubar = require('menubar');
var path = require("path");

// Initialize manubar
var opts = {
  preloadWindow: true,
  showDockIcon: false,
  icon: path.join(__dirname, '/build/IconTemplate.png'),
  resizable: false,
  movable: false,
  alwaysOnTop: false,
  title: "Conda-menu",
  width: 300,
  height: 350,
  transparent: true
};

// set menubar
var mb = menubar(opts);

// On ready
mb.on('ready', function ready () {
  console.log('app is ready');
  mb.tray.setToolTip('Conda Menu')
})

// After creation
mb.on('after-create-window', function ready () {
  //mb.window.webContents.openDevTools() // debugging
})
