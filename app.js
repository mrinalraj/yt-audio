    const express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    PORT = 5050 || process.env.PORT,
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars');

const search = require('./routes/search'),
    dl = require('./routes/dl'),
    play = require('./routes/play');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

//app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/search', search)
app.use('/dl', dl)
app.use('/play', play)


app.listen(PORT, err => {
    if (err) console.log("Error Satarting server")
    else console.log("Server Started at port " + PORT)
})