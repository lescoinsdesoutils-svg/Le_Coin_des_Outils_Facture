const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    title: "Le Coin des Outils – Facturation",
  });
  win.loadURL("http://localhost:5173");
}

const dbPath = path.join(app.getPath("userData"), "quincaillerie.db");
const db = new Database(dbPath);

db.prepare(`CREATE TABLE IF NOT EXISTS parametres (
  id INTEGER PRIMARY KEY,
  nom_entreprise TEXT,
  adresse TEXT,
  telephone TEXT,
  tva REAL DEFAULT 19.25
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  telephone TEXT,
  email TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS fournisseurs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  telephone TEXT,
  email TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS produits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  prix REAL,
  quantite INTEGER
)`).run();

ipcMain.handle("get-parametres", () => {
  const row = db.prepare("SELECT * FROM parametres LIMIT 1").get();
  return row || { nom_entreprise: "Le Coin des Outils", tva: 19.25 };
});

ipcMain.handle("set-parametres", (event, params) => {
  db.prepare("DELETE FROM parametres").run();
  db.prepare(`INSERT INTO parametres (nom_entreprise, adresse, telephone, tva)
              VALUES (@nom_entreprise, @adresse, @telephone, @tva)`).run(params);
  return true;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
