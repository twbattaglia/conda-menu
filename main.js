// Required modules
var menubar = require('menubar')

// Initialize manubar
var opts = {
  preloadWindow: true,
  showDockIcon: true,
  icon: 'build/trayTemplate.png',
  resizable: false,
  movable: false,
  //alwaysOnTop: true,
  title: "condaBar",
  width: 305,
  height: 350
}

// set menubar
var mb = menubar(opts)

// On ready
mb.on('ready', function ready () {
  console.log('app is ready')
})

// After creation
mb.on('after-create-window', function ready () {
  //mb.window.webContents.openDevTools() // debugging
})
