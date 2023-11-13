# NoteTakingApp
 Technical test for CareMaster Global

## Assumptions
- Client, category, notes are optional data
- User can create blank notes (i.e. a note without any data)

## Screenshots
<img src="img/All Notes Screen.png" width="200" title="All Notes Screen">
<img src="img/New Note Screen.png" width="200" title="New Notes Screen">
<img src="img/Edit Note Screen.png" width="200" title="Edit Notes Screen">

## Requirements
1. Create a simple note-taking app.
2. Users should be able to create different notes and link them to a client and a category.
3. The client and category data should be stored in a JSON file.
4. The main page of the app should display a FlatList of all existing notes or show a message if there are none.
5. The available categories to choose from are "Goal Evidence," "Support Coordination," and "Active Duty."
6. The app should have a button to add new notes. When adding a new note, the user should be able to select a client, choose a category, and enter the note text.
7. All notes should be stored in local memory and persisted so that they are not lost when the user closes and reopens the app.
8. Users should be able to edit and delete notes as needed.