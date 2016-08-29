/**
@module preloader browser
*/
require('./include/common')('browser');
const electron = require('electron');
const ipc = electron.ipcRenderer;
const shell = electron.shell;
const mist = require('../mistAPI.js');
require('../openExternal.js');
const BigNumber = require('bignumber.js');
const ipcProviderWrapper = require('../ipc/ipcProviderWrapper.js');
var Web3 = require('web3');
require('../getFavicon.js');
require('../getMetaTags.js');
require('../openExternal.js');
require('./include/setBasePath')('interface');

// register with window manager
ipc.send('backendAction_setWindowId');

// notifiy the tab to store the webview id
ipc.sendToHost('setWebviewId');

// destroy the old socket
ipc.send('ipcProvider-destroy');



window.mist = mist();
window.BigNumber = BigNumber;
window.web3 = new Web3(new Web3.providers.IpcProvider('', ipcProviderWrapper));

// prevent overwriting the Dapps Web3
delete global.Web3;
delete window.Web3;