const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const resourcesURLs = {
    '/' : './public/html/index.html',
    '/css' : './public/css/style.css'
}

const mimeTypes = {
    '.html' : 'text/html',
    '.css' : 'text/css',
}

const err404 = '<center><h1 style="border: 2px solid red;">Errore 404: risorsa non trovata.</h1></center>'

function requestHandler(req, res) {
    let urlObj = new URL(req.url, `http://${req.headers.host}`)
    console.log(`---> Richiesta in entrata: ${urlObj.pathname}`)
    // Errore qua --------------------------------------------------------------------
    let resourcePath = resourcesURLs[urlObj.pathname]
    let ext = resourcePath ? path.extname(resourcePath) : ''
    let contentType = mimeTypes[ext] || 'text/plain'
    // -------------------------------------------------------------------------------
    switch (urlObj.pathname) {
        case '/':
            fs.readFile(resourcesURLs[urlObj.pathname], 'utf-8', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type' : mimeTypes['.html']})
                    res.write(err404)
                } else {
                    res.writeHead(200, { 'Content-Type' : contentType})
                    res.write(data)
                }
                res.end()
            })
            break
        case '/css':
            fs.readFile(resourcesURLs[urlObj.pathname], 'utf-8', function(err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type' : mimeTypes['.html']})
                    res.write(err404)
                } else {
                    res.writeHead(200, { 'Content-Type' : contentType})
                    res.write(data)
                }
                res.end()
            })
            break
        case '/submit':
            const nome = urlObj.searchParams.get('nome')
            const cognome = urlObj.searchParams.get('cognome')
            const email = urlObj.searchParams.get('email')
            const dataNascita = urlObj.searchParams.get('dataNascita')
            const genere = urlObj.searchParams.get('genere')
            const password = urlObj.searchParams.get('password')
            const macchina = urlObj.searchParams.get('macchina')
            const moto = urlObj.searchParams.get('moto')
            const barca = urlObj.searchParams.get('barca')
            const scuola = urlObj.searchParams.get('scuola')
            const commenti = urlObj.searchParams.get('commenti')
            console.log(`# Parametri inviati:\nNome: ${nome}\nCognome: ${cognome}\n` +
                `Email: ${email}\nData di nascita: ${dataNascita}\nGenere: ${genere}\n`+
                `Password: ${password}\nPatente macchina: ${macchina}\nPatente moto: ${moto}\n` +
                `Patente barca: ${barca}\nScuola frequentata: ${scuola}\nCommenti: ${commenti}\n`
            )
            res.end('Dati inviati correttamente.')
            break
        default:
            break
    }
}

const server = http.createServer(requestHandler)
server.listen(port, hostname, function() {
    console.log(`Server in ascolto... http://${hostname}:${port}`)
})