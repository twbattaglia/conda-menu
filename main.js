// Required modules
var menubar = require('menubar')
var path = require("path")

// Initialize manubar
var opts = {
  preloadWindow: true,
  showDockIcon: false,
  icon: path.join(__dirname, '/build/IconTemplate.png'),
  resizable: false,
  movable: false,
  title: "Conda-menu",
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
