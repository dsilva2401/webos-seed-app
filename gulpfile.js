var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var runSequence = require('run-sequence');

// Methods
    var getAppInfo = function () {
        var appInfo = fs.readFileSync(path.join(__dirname, 'app/appinfo.json'));
        return JSON.parse(appInfo);
    }

    var getAppPackageName = function () {
        var appInfo = getAppInfo();
        return appInfo.id+'_'+appInfo.version+'_all.ipk';
    }

// Tasks
    gulp.task('mac:emulator', function () {
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

    gulp.task('package', function () {
        shell.exec('ares-package -o outputs app service');
    })

    gulp.task('install', function () {
        var packagePath = path.join(
            'outputs', getAppPackageName()
        );
        shell.exec('ares-install '+packagePath);
    });

    gulp.task('launch', function () {
        var appInfo = getAppInfo();
        shell.exec('ares-launch '+appInfo.id);
    });

    gulp.task('run-app', function () {
        runSequence(['package', 'install', 'launch']);
    })