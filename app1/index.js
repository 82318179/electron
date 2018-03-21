const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const autoUpdater = electron.autoUpdater;
const dialog = electron.dialog;
const logger = require('./logger.js');

let mainWindow = null;

app.on('ready', function() {
	let options = {
    	minWidth: 400,
    	minHeight: 300,
    	frame: false
	};
	mainWindow = new BrowserWindow(options);
	mainWindow.loadURL('file://' + __dirname + '/index.html');
});

app.on('window-all-closed', function() {
	app.quit();
});


let isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    mainWindow.focus();
  }
});
if (isSecondInstance) {
	app.quit();
}


try {

	autoUpdater.setFeedURL("http://localhost/updates/app1");
	autoUpdater.checkForUpdates();

	autoUpdater.on('update-downloaded', () => {
		console.log("update-downloaded");
		let index = dialog.showMessageBox({
			message: "アップデートがあります",
			detail: "再起動してインストールできます",
			buttons: ["再起動", "あとで"]
		});
		if (index === 0){
			autoUpdater.quitAndInstall();
		}
	});

	autoUpdater.on('update-not-available', () => {
		console.log("update-not-available");
	});

	autoUpdater.on('error', () => {
		console.log("error");
	});

} catch(err) {
	console.log("パッケージ情報が取得できません");
}

/*
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;
const autoUpdater = electron.autoUpdater;
const logger = require('./logger');


let mainWindow = null;


// window(ブラウザ)を生成する
app.on('ready', function() {

  mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 400,
    minHeight: 300
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.maximize();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


// ２重起動防止
let shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
});
if (shouldQuit) app.quit();


// 終了時
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});


// index.htmlからの入力を受け付ける
ipcMain.on('minimize', (e, arg) => {
  mainWindow.minimize();
});
ipcMain.on('maximize', (e, arg) => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});


// アップデート処理
try {
  autoUpdater.setFeedURL('http://192.168.10.100/updates');
  autoUpdater.checkForUpdates();

  autoUpdater.on("update-downloaded", () => {
    console.log("アップデートあり");
    index = dialog.showMessageBox({
      message: "アップデートあり",
      detail: "再起動してインストールできます",
      buttons: ["再起動", "あとで"],
      noLink: true
    });
    if (index === 0) {
      autoUpdater.quitAndInstall();
    }
  });
  /*
  autoUpdater.on("update-available", () => {
   dialog.showMessageBox({
    message: "利用可能なアップデートがあります",
    buttons: ["再起動", "あとで"]
  });
 });
 * /

  autoUpdater.on("update-not-available", () => {
    console.log("アップデートはありません");
  });

  autoUpdater.on("error", () => {
    console.log("アップデートエラーが発生しました");
  });
} catch(err){
  console.log("エラー：パッケージ情報を取得できません");
}
*/