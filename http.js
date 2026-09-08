const http = require('http'); // protocolo http

const charizardJSON = require('./pokemon/charizard.json');


const processRequest= ((req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/charizard':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(charizardJSON));
                
            }
            case 'POST':
                switch (url) {
                    case '/pokemon': {
                        let body = ''
                        
                        req.on('data', (chunk) => {
                            body += chunk.toString();
                        });

                        req.on('end', () => {
                            const data = JSON.parse(body);
                            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                            res.end(JSON.stringify(data));
                            return res.end(JSON.stringify(data));
                        });

                        break;
                    }

        }
    default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    return res.end('404 Not Found');
    }
});


const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log('Servidor escuchando en el puerto http://localhost:1234');
});

