import express from 'express';
import { appendNote, deleteNote } from '../lib/readfile.js';
import fs from 'fs';

// Routes to be sent to main server file
const router = express.Router();
const notesFile = './db/db.json';

// Gets the notes objects from db.json
router.get('/', async (req, res) => {
	try {
		const data = await fs.promises.readFile(notesFile, 'utf8');
		const notes = JSON.parse(data);
		res.json(notes);
	} catch (err) {
		console.error('Error reading notes file:', err);
		res.status(400).json({ message: 'Unable to read notes' });
	}
});

// Creates new notes and writes it to the db.file
router.post('/', (req, res) => {
	const { id, title, text } = req.body;
	const newNote = {
		id: id,
		title: title,
		text: text,
	};

	// Helper function to add new notes to DB
	appendNote(newNote, notesFile);

	return res
		.status(201)
		.json({ message: `Note(id:${id}) succesfully created` });
});

// Deletes notes based on which id is sent
router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	if (!id)
		return res
			.status(400)
			.json({ message: 'Error. Id of note needed to delete' });

	// Helper function to delete the specific note from DB
	const deleted = await deleteNote(notesFile, id);

	if (deleted === false) {
		return res.status(404).json({ message: 'Id not found' });
	}

	return res
		.status(202)
		.json({ message: `Note(id:${id}) succesfully deleted` });
});

export default router;
