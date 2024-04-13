"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoRouter = void 0;
const express_1 = require("express");
exports.infoRouter = (0, express_1.Router)();
exports.infoRouter.get('/', (req, res) => {
    res.send('GET - Wir haben heute viel über APIs und HTTP gelernt.');
});
exports.infoRouter.post('/', (req, res) => {
    res.send('POST - Deine Post Anfrage ist angekommen!');
});
