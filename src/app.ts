import express from 'express';


//
// Constants
//
const port = 80;


//
// Express setup
//
const server = express();
server.use(express.static("public"));


//
// Start the server
//
server.listen(port, () => console.log(`[DEBUG] Server listening on port ${port}.`));