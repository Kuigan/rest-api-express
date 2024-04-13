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
exports.addNote = exports.getNotes = void 0;
const fs = __importStar(require("node:fs"));
function getNotes() {
    const notesRaw = fs.readFileSync('data/notes.json', 'utf8');
    const notizen = JSON.parse(notesRaw);
    const array = notizen.notes;
    return array;
}
exports.getNotes = getNotes;
// Aufgabe 3: Teil 1: Code aufräumen
function addNote(title, content, user) {
    // 1. Alte Daten abfragen
    const oldNotes = getNotes();
    // 2. Neue ID generieren
    const id = oldNotes.length + 1;
    // 3. Neue Notiz erstellen
    const newNote = {
        title: title,
        content: content,
        user: user,
        id: id
    };
    // 4. Neue Notiz hinzufügen
    oldNotes.push(newNote);
    // 5. Neue Notizen in Datei speichern
    const newNotes = { notes: oldNotes };
    fs.writeFileSync('data/notes.json', JSON.stringify(newNotes));
}
exports.addNote = addNote;
