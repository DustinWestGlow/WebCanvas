const http = require("http");

const host = '127.0.0.1';
const port = 8080;

// const requestListener = function (req, res) {
//     res.writeHead(200);
//     res.end("My first server!");
// };

const requestListener = {}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// http.createServer( function (request, response) {
//   var pathname = url.parse(request.url).pathname;
//   console.log("Trying to find '" + pathname.substr(1) + "'...");

//   fs.readFile(pathname.substr(1), function (err, data) {
//     if (err) {
//       response.writeHead(404, {'Content-Type': 'text/html'});
//       response.write("ERROR: Cannot find '" + pathname.substr(1) + "'.");
//       console.log("ERROR: Cannot find '" + pathname.substr(1) + "'.");
//     } else {
//       console.log("Found '" + pathname.substr(1) + "'.");
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       response.write(data.toString());
//     }
//     response.end();
//   });
// }).listen(8080, '127.0.0.1'); // Or 8081 or 8082 instead of 8080. Or '127.0.0.1' instead of 'localhost'.