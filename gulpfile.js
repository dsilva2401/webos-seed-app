var gulp = require('gulp');
var path = require('path');
var shell = require('shelljs');

gulp.task('mac:emulator:start', function () {
    var emulatorPath = '$WEBOS_CLI_TV/../../Emulator/';
    var emulatorsList = shell.exec('ls '+emulatorPath).split('\n');
    var emilatorVersion = emulatorsList[emulatorsList.length-2];
    emulatorPath += emilatorVersion+'/';
    var filesInsideEmulatorDir = shell.exec('ls '+emulatorPath).split('\n');
    var emulatorFileName = filesInsideEmulatorDir.filter(function (entry) {
        return entry.match(/\.app$/);
    })[0];
    emulatorPath += emulatorFileName;
    shell.exec('open '+emulatorPath);
})