import { ipcMain, IpcMessageEvent } from 'electron';

const { BrowserWindow } = require('electron');

let smartWindow : any;

export const prepareSmartWindow = () => {
  smartWindow = new BrowserWindow({ width: 800, height: 600 });
  smartWindow.show();

  ipcMain.on('smart-window-load', async (e: IpcMessageEvent, content: string) => {
    loadSmartWindowWithContent(content);
  });
};

export const loadSmartWindowWithContent = (content: string) => {
  const html = `
    <!DOCTYPE html>
    <html lang="zh">
      <head>
        <title>Smart Window</title>
        <meta charset="UTF-8">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;

  const file = `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`;
  smartWindow.loadURL(file);
};
