var conda = require('conda');
var pythonShell = require('python-shell');
var childprocess = require('child_process');
var path = require("path");
var _ = require('underscore');
var fixPath = require('fix-path');
var shelljs = require('shelljs');
var app = require('electron').remote.app;
fixPath();

// Verify anaconda installation
if (!shelljs.which('conda')) {
  confirm("Conda installation could not be found! Please install anaconda or miniconda before running again!");
  app.quit();
}

// Get anaconda prefix location
var aPrefix = shelljs.which('conda').stdout.replace("/bin/conda", "");
console.log("Anaconda root prefix:", aPrefix);

// Set root
var appRoot = path.join(__dirname, 'app/cmd/');

// Set default python-shell script location
pythonShell.defaultOptions = { scriptPath: appRoot };

// Initialize angular apply
var ngApp = angular.module('ngApp', ['ngRoute', 'selectize', "angular-ladda"]);

// Main Controller
ngApp.controller('mainCtrl', ['$scope', '$location',
  function ($scope, $location, $element) {

    // Quality testing
    $scope.testing = "hello!";

    // Function to quit the app
    $scope.quit = function(){
      app.quit();
    };

    // Function to refresh envs
    $scope.refresh = function(){
      $scope.get_envs();
    };

    // Get conda environments function
    $scope.get_envs = function (){
      pythonShell.run('get_envs.py',
      { args: [aPrefix], mode: 'json'},
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
    $scope.get_conda_info = function (){
      pythonShell.run('get_conda_info.py',
      {args: [aPrefix], mode: 'json'},
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
    $scope.launch_env = function (envName){
      childprocess.spawn('bash', [ path.join(__dirname, 'app/cmd/launch_env.sh'), envName.prefix], {
        env:_.extend(process.env.PATH, { PATH: process.env.PATH + ':/usr/local/bin' })
      });
      console.log("Launching Env: ", envName.prefix);
    };

    // Get installed python packages function
    $scope.get_installed = function (){
      pythonShell.run('get_installed.py',
      {mode: 'json'},
      function (err, results) {
        if (err) {
          console.log("Installed error:", err);
          console.log("Installed results:", results);
        }
        console.log("Getting installed packages", results[0]);
        $scope.$apply(function(){
            $scope.installed = results[0];
            $scope.pypiInstallLoading = false;
        });
      });
    };

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
    $scope.create_env = function(name, version, packages){
      $scope.createLoading = true;
      $scope.newEnvName = name;
      if(version === null){
        alert("Error, the Python version was not defined.");
      }
      console.log("Creating environment", name);
      pythonShell.run('create_env.py',
      {mode: 'json', args: [aPrefix, name, version, packages]},
      function (err, results) {
        if (err) {
          console.log("Create error:", err);
          alert(err);
          $('#createEnvModal').on('hidden.bs.modal', function () {
              $(this).find('form').trigger('reset');
          });
          console.log("Create results:", results);
        }
        console.log("Creating environment", name, "completed.");
        $scope.get_envs();
        $('#createEnvModal').modal('hide');
        $('#createEnvModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
        $scope.newEnvPackages = [name = "pip"]; // reset packages
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
    $scope.remove_env = function(name){
      $scope.removeLoading = true;
      console.log("Removing environment", name);
      pythonShell.run('remove_env.py',
      {mode: 'json', args: [aPrefix, name]},
      function (err, results) {
        if (err) {
          console.log("Remove error:", err);
          console.log("Remove results:", results);
        }
        $scope.get_envs();
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

    // Checkbox for settings
    $scope.checkboxModel = false;

    // Run at app startup
    $scope.get_envs();
    $scope.get_installed();
    $scope.get_conda_info();

    // Launch with settings
    $scope.launchWithApp = "Terminal.app";

}]); // End of main controller


// Global settings for ladda spinner
ngApp.config(function (laddaProvider) {
    laddaProvider.setOption({ /* optional */
      style: 'expand-left',
      spinnerSize: 14,
      spinnerColor: '#ffffff'
    });
  });
