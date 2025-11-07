const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getParametres: () => ipcRenderer.invoke("get-parametres"),
  setParametres: (params) => ipcRenderer.invoke("set-parametres", params)
});
