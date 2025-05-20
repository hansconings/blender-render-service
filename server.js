const express = require('express');
const bodyParser = require('body-parser');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const RENDERS_DIR = path.join(__dirname, 'renders');
if (!fs.existsSync(RENDERS_DIR)) {
    fs.mkdirSync(RENDERS_DIR);
}

app.post('/render', (req, res) => {
    const specs = req.body;
    const outputFile = path.join(RENDERS_DIR, `render_${Date.now()}.png`);

    // Voorbeeld: call Blender met Python script en parameters
    const blenderArgs = [
        '--background',
        './models/base_model.blend',
        '--python', './scripts/generate.py',
        '--',
        JSON.stringify(specs),
        outputFile
    ];

    execFile('blender', blenderArgs, (error, stdout, stderr) => {
        if (error) {
            console.error('Error during rendering:', error);
            res.status(500).send({error: 'Rendering failed'});
            return;
        }

        fs.readFile(outputFile, {encoding: 'base64'}, (err, data) => {
            if (err) {
                res.status(500).send({error: 'Failed to read output image'});
                return;
            }
            res.send({image: data});
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});