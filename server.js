const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
app.use(express.static('public'))
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'))
app.use(cors())
mime = require('mime')

const appdata = [
    {'name': 'Note 1', 'note': "This is a test note."},
];

app.use( function( req, res, next ) {
    console.log( 'url:', req.url )
    next()
})
app.get( '/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html" )
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})

app.get('/updatePage', function(req,res) {
    const type = mime.getType(appdata);
    res.writeHead(200, {'Content-Type': type});
    res.write(JSON.stringify(appdata));
    res.end()
})

app.post('/add', function(req,res) {
    let dataString = ''
    req.on('data', function (data) {
        dataString += data
    })
    req.on('end', function () {
        console.log(dataString)
        let jsonApp = JSON.parse(dataString);
        appdata.push(jsonApp);
        console.log("appdata:\n" + JSON.stringify(appdata));
        res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        res.end()
    })
})

app.post('/delete', function(req,res) {
    let dataString = ''
    req.on('data', function (data) {
        dataString += data
    })
    req.on('end', function () {
        console.log(dataString)
        for (let i = 0; i < appdata.length; i++) {
            let row = appdata[i];
            console.log("dataString = " + dataString.slice(5));
            if ((i + 1).toString() === dataString.slice(5)) appdata.splice(i, 1);
        }
        console.log("appdata:\n" + JSON.stringify(appdata));
        res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        res.end()
    })
})

app.post('/modify', function(req,res) {
    let dataString = ''
    req.on('data', function (data) {
        dataString += data
    })
    req.on('end', function () {
        console.log(dataString)
        let jsonApp = JSON.parse(dataString);
        for (let i = 0; i < appdata.length; i++) {
            console.log("i = " + i);
            console.log("jsonApp = " + jsonApp['modifyIndex']);
            if ((i + 1).toString().normalize() === (jsonApp['modifyIndex'].toString().normalize())) {
                let row = appdata[i];
                row['name'] = jsonApp['name'];
                row['note'] = jsonApp['note'];
            }
        }
        console.log("appdata:\n" + JSON.stringify(appdata));
        res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        res.end()
    })
})