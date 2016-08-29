/**
Opens windows and popups

@module openExternal
*/

const electron = require('electron');
const shell = electron.shell;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;


// open a[target="_blank"] in external browser
document.addEventListener('click', function(e) {
    var node = false;

    if(e.target.nodeName === 'A')
        node = e.target;
    else if(e.target.parentNode && e.target.parentNode.nodeName === 'A')
        node = e.target.parentNode;

    // open in browser
    if(node && node.attributes.target && node.attributes.target.value === "_blank") {
        e.preventDefault();
        shell.openExternal(node.href);
    }

    // open popup
    if(node && node.attributes.target && node.attributes.target.value === "_popup") {
        e.preventDefault();
        var win = new BrowserWindow({ width: 800, height: 420, webPreferences: {
            nodeIntegration: false
        }});
        win.loadURL(node.href);
    }
}, false);

