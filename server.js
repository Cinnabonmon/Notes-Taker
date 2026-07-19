// Imports
import express from 'express';
import path from 'path';
import api from './routes/index.js';

// Port and app use
const port = process.env.PORT || 3001;
const app = express();
const _dirname = import.meta.dirname;

// Middleware
app.use(express.static(path.join(_dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express route to /api
app.use('/api', api);

// Gets index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(_dirname, '/public/index.html'));
});

// Gets note.html
app.get('/notes', (req, res) => {
	res.sendFile(path.join(_dirname, '/public/notes.html'));
});

// Listens to port and starts server
app.listen(port, () => {
	console.log(`Notes app is listening on port http:localhost:${port}`);
});
