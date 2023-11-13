import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  client: string;
  category: string;
  noteText: string;
};

export type Notes = {
  notes: Array<Note>;
};

const STORE_KEY = 'NOTES_STORE_KEY';

// Get all notes for home page
export const getAllNotes = async () => {
  const storeItem = await AsyncStorage.getItem(STORE_KEY);
  if (storeItem) {
    return JSON.parse(storeItem) as Notes;
  }
  return {notes: []};
};

// Get individual notes by noteId
export const getNote = async (id: string) => {
  const storeItem = await getAllNotes();
  if (storeItem) {
    const note = storeItem.notes.find(note => note.id === id);
    return note;
  }
  return null;
};

// Save note to local memory
export const saveNote = async (
  noteId: string | undefined,
  client: string,
  category: string,
  text: string,
) => {
  const storeItem = await getAllNotes();

  if (noteId) {
    // Edit existing note
    const noteIndex = storeItem.notes.findIndex(note => note.id === noteId);
    // Replace existing note
    storeItem.notes.splice(noteIndex, 1, {
      id: noteId,
      client: client,
      category: category,
      noteText: text,
    });
  } else {
    // Add new note to the array
    storeItem.notes.push({
      id: Date.now().toString(),
      client: client,
      category: category,
      noteText: text,
    });
  }

  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(storeItem)); // Convert JSON object to string as async storage expects type string
};

// Delete selected note
export const deleteNote = async (noteId: string) => {
  const storeItem = await getAllNotes();
  const noteIndex = storeItem.notes.findIndex(note => note.id === noteId);
  storeItem.notes.splice(noteIndex, 1); // Remove the note from the list
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(storeItem)); // Convert JSON object to string as async storage expects type string
};
