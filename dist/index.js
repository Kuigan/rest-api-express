"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const info_1 = require("./routes/info");
const notes_1 = require("./routes/notes");
// we define our server and port
const app = (0, express_1.default)();
const port = 3000;
// Setup custom middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Setup routes
app.use('/info', info_1.infoRouter);
app.use('/notes', notes_1.notesRouter);
// http-request: method (GET, POST, ...), URL (path)
// this structure is used by express
app.get('/', (req, res) => {
    res.send('Hallo Welt! Ich bin ein Express-Server');
});
// start our server
app.listen(port, () => {
    console.log(`Server is runnig at http://localhost:${port}`);
});
