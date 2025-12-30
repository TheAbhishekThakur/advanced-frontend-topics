const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const port = 3000;

// enable gzip compression with filter to exclude 'big' in the name
// app.use(compression({
//     filter: (req, res) => {
//         // Don't compress files with 'big' in the filename
//         if (req.url.includes('big')) {
//             return false;
//         }
//         // Use the default compression filter function for other files
//         return compression.filter(req, res);
//     }
// }));

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});