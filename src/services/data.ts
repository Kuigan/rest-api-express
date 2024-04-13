import * as fs from 'node:fs'
import { Note } from '../types/notes'
import { getNotes } from './data'

type NotesRaw = {
  notes: Note[]
}

export function getNotes(): Note[] {
  const notesRaw = fs.readFileSync('data/notes.json', 'utf8')
  const notizen = JSON.parse(notesRaw) as NotesRaw
  const array = notizen.notes
  return array
}

// Aufgabe 3: Teil 1: Code aufräumen
/*
Erstelle eine Funktion in services/data.ts, dessen Aufgabe es ist eine neue Notiz zu erstellen 
und diese Notiz in der notes.json-Datei zu speichern. Sie soll selbstständig eine neue ID erreichen. 
Die Funktion soll folgende Signatur haben:

export function addNote(title: string, content: string, user: string): void {
  // Implementierung
}
*/

export function addNote(title: string, content: string, user: string): void {
  // 1. Alte Daten abfragen
  const oldNotes = getNotes()

  // 2. Neue ID generieren
  const id = oldNotes.length + 1

  // 3. Neue Notiz erstellen
  const newNote: Note = {
    title: title,
    content: content,
    user: user,
    id: id
  }

  // 4. Neue Notiz hinzufügen
  oldNotes.push(newNote)

  // 5. Neue Notizen in Datei speichern
  const newNotes = { notes: oldNotes }
  fs.writeFileSync('data/notes.json', JSON.stringify(newNotes))
}


// Teil 2: Methode selbstständig implementieren
/*
Implementiere den Endpunkt DELETE /notes/:id selbstständig. 
Der Endpunkt soll eine Notiz mit der ID :id löschen. 
Wenn die Notiz mit der ID :id nicht existiert, 
soll ein Fehler mit dem Statuscode 404 zurückgegeben werden. 
Wenn die Notiz erfolgreich gelöscht wurde, 
soll ein Statuscode 204 zurückgegeben werden.

Hinweise:

Überlege dir, wie du diese Aufgabe in kleinere Unterschritte aufteilen kannst.
Implementiere zuerst die Funktion in services/data.ts, die die Notiz löscht. 
Arrays stellen eine Funktion namens filter zur Verfügung, die dir dabei helfen könnte.
Implementiere dann den Endpunkt in routes/notes.ts.
Teste den Endpunkt mit Postman.
Probiere so weit wie du kommst. Wenn du nicht weiterkommst, 
ist das auch kein Problem. Schreibe einfach auf, wo du festhängst und warum.
*/

export function deleteNote(id: number): boolean {
  // Alte Daten abfragen
  const oldNotes = getNotes()

  // Notiz mit der angegebenen ID finden und entfernen
  const index = oldNotes.findIndex(note => note.id === id)
  if (index !== -1) {
    oldNotes.splice(index, 1)

    // Neue Notizen in Datei speichern
    const newNotes = { notes: oldNotes }
    fs.writeFileSync('data/notes.json', JSON.stringify(newNotes))

    return true
  } else {
    return false
  }
}