// Required modules
var menubar = require('menubar');
var os = require('os');

// Livereload (turn off for production)
//require('electron-reload')(__dirname);

// Set options based on system
if(os.platform() == "darwin"){
  onTop = false;
}
if(os.platform() == "win32"){
  onTop = true;
}

// Initialize manubar
var opts = {
  preloadWindow: true,
  showDockIcon: false,
  resizable: false,
  icon: __dirname + '/iconTemplate.png',
  movable: false,
  alwaysOnTop: onTop,
  title: "Conda-menu",
  width: 360,
  height: 375,
  transparent: true,
  frame: false
};

// set menubar
var mb = menubar(opts);

// On ready
mb.on('ready', function ready () {
  console.log('app is ready');
  mb.tray.setToolTip('Conda-menu');
})

// After creation
mb.on('after-create-window', function ready () {
  //mb.window.webContents.openDevTools() // debugging
})
