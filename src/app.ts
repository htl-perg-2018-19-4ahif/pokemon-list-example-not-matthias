import express from 'express';

const port = 80;

const server = express();
server.use(express.static("public"));


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));