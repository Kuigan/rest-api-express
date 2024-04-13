"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = require("express");
const fs = __importStar(require("node:fs"));
// const fs = require('fs')
const data_1 = require("../services/data");
exports.notesRouter = (0, express_1.Router)();
// CRUD - Create Read Update Delete
// PUT/PATCH, POST, GET, DELETE
// Create - POST
exports.notesRouter.post('/', (req, res) => {
    // 1. Daten aus der Anfrage auslesen
    // Wir erwarten, dass wir Informationen zum title, content, user
    // Warum erwarten wir keine ID? Eine ID liegt in unserer Verantwortung
    // const { title, content, user } = req.body
    const title = req.body.title;
    const content = req.body.content;
    const user = req.body.user;
    // 2. Daten möchten wir an unsere Datei anhängen
    // Merke: ID selber festlegen
    // 2.1 alte Daten abfragen
    const oldNotes = (0, data_1.getNotes)();
    const id = oldNotes.length + 1; // keine saubere Lösung, aber reicht aus
    // 2.2 neue Notiz erstellen
    const newNote = {
        title: title,
        content: content,
        user: user,
        id: id
    };
    oldNotes.push(newNote);
    // 2.3 neue Notiz in Datei hinzufügen
    const newNotes = { notes: oldNotes };
    fs.writeFileSync('data/notes.json', JSON.stringify(newNotes));
    // 3. Rückmeldung geben, ob alles funktioniert hat
    res.send(204);
});
// Read - GET
// '/' return all saved notes
exports.notesRouter.get('/', (req, res) => {
    // 1. Inhalte aus der Datei auslesen
    // 2. Daten zwischenspeichern und verarbeiten und vorbereiten
    const notes = (0, data_1.getNotes)();
    // 3. Inhalte ausliefern
    res.status(200).send(notes);
    // 4. auf Postman Anfrage senden -> überprüfen, ob alles funktioniert
});
// '/:id' return only one result
exports.notesRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // 1. Inhalte aus der Datei auslesen
    // 2. Daten zwischenspeichern und verarbeiten und vorbereiten
    const notes = (0, data_1.getNotes)(); // Liste von Notizen
    // nur die Notiz finden, die die verlangte ID hat
    const note = notes.find(note => note.id === id);
    // console.log(note)
    // 3. Inhalte ausliefern
    if (note === undefined) {
        // wenn wir keine passende Notiz gefunden haben
        res.status(404).send(`Note with ID ${id} was not found.`);
    }
    else {
        // notiz gefunden
        res.status(200).send(note);
    }
    // 4. auf Postman Anfrage senden -> überprüfen, ob alles funktioniert
});
// Update - PUT/PATCH -> TODO: Beispiel
exports.notesRouter.put('/:id', (req, res) => { });
// Delete - DELETE
exports.notesRouter.delete('/:id', (req, res) => { });
