import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    const { name } = req.query; // Estrai ver da req.query

    let bookPath;
    bookPath = path.join(process.cwd(), 'book', `${name}`);
    
    fs.readFile(bookPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Errore nel caricamento del file');
        }
        res.status(200).send(data);
    });
}
