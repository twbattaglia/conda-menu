// Required modules
var menubar = require('menubar');
var os = require('os');

// Livereload (turn off for production)
//require('electron-reload')(__dirname);

// Set options based on system
// Get anaconda prefix location
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
  icon: __dirname + '/build/IconTemplate.png',
  dir: __dirname,
  resizable: false,
  movable: false,
  alwaysOnTop: onTop,
  title: "Conda-menu",
  width: 350,
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
