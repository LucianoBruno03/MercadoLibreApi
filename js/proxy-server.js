const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  // Configura el encabezado de origen cruzado (CORS) en la respuesta
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Reenvía la solicitud a la API
  proxy.web(req, res, { target: 'https://api.mercadolibre.com' });
});

server.listen(3000, () => {
  console.log('Servidor proxy en funcionamiento en el puerto 3000');
});
