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

app.use( function( req, res, next ) {
    console.log( 'url:', req.url )
    next()
})
app.get( '/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html" )
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})