import fs from 'fs';

/**
 * Function to add a note to the db and write it to a new file
 * @param {object} note The note object to be added
 * @param {string} filepath The file path to the db
 * @returns {void} Nothing
 * **/
async function appendNote(note, filePath) {
	try {
		const data = await fs.promises.readFile(filePath, 'utf-8');
		const notes = JSON.parse(data);
		const newNote = note;
		notes.push(newNote);

		await fs.promises.writeFile(filePath, JSON.stringify(notes));
	} catch (err) {
		console.error('Error parsing the file data:', err);
	}
}

/**
 * Function to delete a note based on the note passed in
 * @param {string} filepath The file path to the db
 * @param {string} uuid The id of the object
 * @returns {Promise<boolean>} True when deleted, false when the id is not found
 * **/
async function deleteNote(filePath, id) {
	try {
		const data = await fs.promises.readFile(filePath, 'utf8');
		let notes = JSON.parse(data);
		const selectedNote = notes.find((note) => note.id == id);

		if (!selectedNote) {
			return false;
		}

		notes = notes.filter((note) => note !== selectedNote);
		await fs.promises.writeFile(filePath, JSON.stringify(notes));
		return true;
	} catch (err) {
		console.error('Error parsing through the file:', err);
		return false;
	}
}

export { appendNote, deleteNote };
