var pythonShell = require('python-shell');
var childprocess = require('child_process');
var cspawn = require('cross-spawn');
var path = require("path");
var _ = require('underscore');
var fixPath = require('fix-path');
var shelljs = require('shelljs');
var app = require('electron').remote.app;
var Dialog = require('electron').remote.dialog;
var Shell = require('electron').remote.shell;
var AutoLaunch = require('auto-launch');
var config = require('electron-json-config');
var os = require('os');

// fix path for macOS
fixPath();

// launch app at startup
var condaMenuAutoLauncher = new AutoLaunch({
    name: 'Conda-menu'
});

// Verify anaconda installation
if (!shelljs.which('conda')) {
  confirm("Conda installation could not be found! Please install Anaconda or Miniconda before running again!");
  Shell.openExternal('https://www.continuum.io/downloads');
  app.quit();
}

// Get anaconda prefix location
if(os.platform() == "darwin"){
  console.log("Using macOS");
  var prefix = shelljs.which('conda').stdout.replace("/bin/conda", "");
  console.log("Anaconda root prefix:", prefix);
}
if(os.platform() == "win32"){
  console.log("Using Windows");
  var prefix = shelljs.which('conda').stdout.replace("CONDA.EXE", "").replace("SCRIPTS", "");
  console.log("Anaconda root prefix:", prefix);
}

// Set anaconda root prefix
pythonShell.defaultOptions = {
  scriptPath: path.join(__dirname, 'app/cmd/')
};

// Initialize angular apply
var ngApp = angular.module('ngApp', ['selectize', 'angular-ladda']);

// Global settings for ladda spinner
ngApp.config( function(laddaProvider) {
    laddaProvider.setOption({
      style: 'expand-left',
      spinnerSize: 14,
      spinnerColor: '#ffffff'
    });
});


// Main Controller
ngApp.controller('mainCtrl', ['$scope', '$location',
  function ($scope, $location, $element) {

    // production level testing
    $scope.testing = "hello!";

    // Set root prefix
    $scope.anacondaRoot = prefix;

    // Set app version
    $scope.appVersion = app.getVersion();

    // Function to quit the app
    $scope.quit = function(){
      app.quit();
    };

    // Function to refresh env
    var degrees = 360;
    $scope.refresh = function(){
      var csstransition = '1000ms ease';
      var cssrotate = 'rotate(' + degrees + 'deg)';
      angular.element('#refresh').css({
        '-webkit-transition': csstransition,
        '-moz-transition': csstransition,
        '-o-transition': csstransition,
        'transition': csstransition,
        '-moz-transform': cssrotate,
        '-webkit-transform': cssrotate,
        '-o-transform': cssrotate,
        '-ms-transform': cssrotate
      });
      degrees += 360;
      $scope.getCondaEnvs();
    };

    // Get conda environments function
    $scope.getCondaEnvs = function (){
      pythonShell.run('get_envs.py',
      { args: [prefix], mode: 'json'},
      function (err, results) {
        if (err){
          console.log(err);
        }
        console.log("Getting conda envs", results[0]);
        $scope.$apply(function(){
            $scope.environments = results[0];
            $scope.createLoading = false;
        });
      });
    };

    // Get general conda information for settings
    $scope.getCondaInfo = function (){
      pythonShell.run('get_conda_info.py',
      {args: [prefix], mode: 'json'},
      function (err, results) {
        if (err){
          console.log(err);
        }
        console.log("Getting conda information", results[0]);
        $scope.$apply(function(){
            $scope.condaInfo = results[0];
        });
      });
    };

    // Launch conda environment function
    $scope.launchEnv = function (envName){
      console.log("Launching Env: ", envName.prefix);
      if(os.platform() == "darwin"){
        var resMac = cspawn.sync('bash', [ __dirname + '/app/cmd/launch_env.sh', envName.prefix], { stdio: 'inherit' });
      }
      if(os.platform() == "win32"){
        shelljs.exec('start cmd /k activate ' + envName.prefix, function(code, stdout, stderr) {});
      }
    };

    // Launch conda environment in ipython notebook function
    $scope.launchJupyter = function (envName){

      // Check if jupyter package exists
      if (!shelljs.which('jupyter')) {
        console.log("Error finding Jupyter package.")
      } else {
        console.log("Launching Jupyter: ", envName.prefix);

        // macOS
        if(os.platform() == "darwin"){
          var resMac = cspawn.sync('bash', [ __dirname + '/app/cmd/launch_jupyter.sh', envName.prefix], { stdio: 'inherit' });
        }

        // Windows
        if(os.platform() == "win32"){
          shelljs.exec('start cmd /k activate ' + envName.prefix + '; jupyter notebook', function(code, stdout, stderr) {});
        }
      }
    };

    // Get installed python packages function
    //$scope.getPipPackages = function (){
    //  pythonShell.run('get_installed.py',
    //  {mode: 'json'},
    //  function (err, results) {
    //    if (err) {
    //      console.log("Installed error:", err);
    //      console.log("Installed results:", results);
    //    }
    //    console.log("Getting installed packages", results[0]);
    //    $scope.$apply(function(){
    //        $scope.installed = results[0];
    //    });
    //  });
    //};

    // Settings for selectize
    $scope.newEnvVersion = "3.5";
    $scope.newEnvPackages = [name = "pip"];
    $scope.newEnvPackagesConfig = {
      create: true,
      valueField: 'name',
      labelField: 'name',
      searchField: ['name'],
      delimiter: ',',
      placeholder: 'Enter Python packages'
    };

    // Create new environment function
    $scope.createNewEnv = function(name, version, packages){
      $scope.createLoading = true;
      $scope.newEnvName = name;
      if(version === null){
        alert("Error, the Python version was not defined.");
      }
      console.log("Creating environment", name);
      pythonShell.run('create_env.py',
      {args: [prefix, name, version, packages]},
      function (err, results) {
        if (err) {
          console.log("Create error:", err);
          alert(err.traceback);
          $('#createEnvModal').on('hidden.bs.modal', function () {
              $(this).find('form').trigger('reset');
          });
          console.log("Create results:", results);
        }
        console.log("Creating environment", name, "completed.");
        $scope.getCondaEnvs();
        $('#createEnvModal').modal('hide');
        $('#createEnvModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
        $scope.newEnvPackages = [name = "pip"]; // reset packages
      });
    };

    // Create modal for exorting conda-env
    $scope.exportEnvModal = function(envName){
      $('#exportEnvModal').modal('show');
      $scope.exportEnvName = envName.prefix;
    };

    // Functions to create YML when file is dragged into app
    document.body.ondragover = function(e) {
      document.getElementById('dropoverlay').className = "";
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    };
    document.body.ondrop = function(ev) {
      document.getElementById('dropoverlay').className = "hidden";
      var file_path = ev.dataTransfer.files[0].path;
      console.log("File imported from", file_path);
      $('#createEnvYamlModal').modal('show');
      $scope.createEnvYml(file_path);
      ev.preventDefault();
    };
    document.body.ondragleave = function () {
      document.getElementById('dropoverlay').className = "hidden";
      return false;
    };

    // Function to create env by imported YAML file
    $scope.createEnvYml = function(yml){
      console.log("Creating YML environment", name);
      pythonShell.run('create_env_yml.py',
      {mode: 'json', args: [prefix, yml]},
      function (err, results) {
        if (err) {
          console.log("Create error:", err);
          alert(err);
          console.log("Create results:", results);
        }
        console.log("Creating YAML environment, completed.");
        $scope.$apply(function(){
            $scope.getCondaEnvs();
        });
        $('#createEnvYamlModal').modal('hide');
      });
    };

    // Dialog for creating new YAML env
    //$scope.openDialog = function() {
    //    $scope.createLoadingYml = true;
    //    Dialog.showOpenDialog({
    //        title: 'open YAML',
    //        properties: ['openFile'],
    //        buttonLabel: "Import",
    //        filters: [
    //          {name: 'YAML', extensions: ['yml', 'yaml', 'txt']},
    //          {name: 'All Files', extensions: ['*']}
    //      ]
    //    }, function(file) {
    //      if(file === undefined){
    //          $('#createEnvModal').modal('hide');
    //          $scope.createLoadingYml = false;
    //          console.log("No file selected");
    //      } else{
    //          console.log("file selected");
    //          $scope.createEnvYml(file);
    //      }
    //    });
    //};

    // Create modal for cloning conda-env
    $scope.cloneEnvModal = function(envName){
      $scope.cloneEnvModalName = envName.prefix;
      $('#cloneEnvModal').modal('show');
    };

    // Cloned environment function
    $scope.cloneEnv = function(name, env){
      $scope.cloneLoading = true;
      console.log("Cloning environment", env, "into ", name);
      pythonShell.run('clone_env.py',
      {mode: 'json', args: [prefix, name, env]},
      function (err, results) {
        if (err) {
          console.log("Cloned error:", err);
          console.log("Cloned results:", results);
        }
        $scope.getCondaEnvs();
        console.log("Cloned environment", name, "created..");
        $scope.cloneLoading = false;
        $('#cloneEnvModal').modal('hide');
        $('#cloneEnvModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
      });
    };

    // Dialog for exporting env to YML
    $scope.saveYAML = function(env) {
      Dialog.showSaveDialog({defaultPath: env + '.yaml'}, function(fileName){
        if (fileName === undefined){
          console.log("No file save.");
          return;
        }
        console.log("Saved environment to: ", fileName);
        $scope.exportEnv(fileName, env);
      });
    };

    // Function to export env
    $scope.exportEnv = function(file, name){
      pythonShell.run('export_env_yml.py',
      {mode: 'json', args: [prefix, file, name]},
      function (err, results) {
        if (err) {
          console.log("Export error:", err);
          alert(err);
          console.log("Export results:", results);
        }
        alert(name + " has been sucessfully saved.");
        console.log("Exporting YAML environment, completed.");
      });
    };

    // Clear create-env form on cancel
    $scope.clearForm = function(){
      $('#createEnvModal').on('hidden.bs.modal', function () {
          $(this).find('form').trigger('reset');
      });
      $scope.newEnvPackages = [name = "pip"];
    };

    // Create modal for removing conda-env
    $scope.removeEnvModal = function(envName){
      $scope.removeEnvModalName = envName.prefix;
      $('#envDeleteModal').modal('show');
    };

    // Remove environment function
    $scope.removeEnv = function(name){
      $scope.removeLoading = true;
      console.log("Removing environment", name);
      pythonShell.run('remove_env.py',
      {mode: 'json', args: [prefix, name]},
      function (err, results) {
        if (err) {
          console.log("Remove error:", err);
          console.log("Remove results:", results);
        }
        $scope.getCondaEnvs();
        console.log("Removing environment", name, "completed.");
        $scope.removeLoading = false;
        $('#envDeleteModal').modal('hide');
      });
    };

    // Create modal for removing conda-env
    $scope.getInfoModal = function(envName){
      $scope.getInfoPkgs = envName.packages;
      $scope.getInfoName = envName.prefix;
      $scope.getInfoLocation = envName.location;
      $('#envInfoModal').modal('show');
    };

    // First check to see if user settings exist.
    // If no, set default
    // If yes, read in settings and apply to scope
    //config.set('autoLaunch', true);
    console.log("Autolaunch set to: " + config.get('autoLaunch'));

    // Look for config, and if not set, set default to false
    if(config.get('autoLaunch') === undefined){
      $scope.checkboxModel = false;
    } else if (config.get('autoLaunch') === true) {
      $scope.checkboxModel = true;
    } else if (config.get('autoLaunch') === false) {
      $scope.checkboxModel = false;
    }

    // Set config to false
    $scope.setFalse = function(){
      condaMenuAutoLauncher.disable();
      console.log("disabled autolaunch");
      config.set('autoLaunch', false);
      $scope.checkboxModel = false;
    };

    // Set config to true
    $scope.setTrue = function(){
      condaMenuAutoLauncher.enable();
      console.log("enabled autolaunch");
      config.set('autoLaunch', true);
      $scope.checkboxModel = true;
    };

    // Run at app startup
    $scope.getCondaEnvs();
    setInterval(function(){ $scope.getCondaEnvs(); }, 80000);
    //$scope.getPipPackages();
    $scope.getCondaInfo();

}]); // End of main controller
