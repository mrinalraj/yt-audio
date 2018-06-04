require('dotenv').config();
const ytSearch = require('youtube-search'),
    express = require('express'),
    router = express.Router();

router.get('/:qry', (req, res, next) => {

    console.log(process)
    let qry = req.params["qry"];
    if (qry === null) {
        sendErrorResponse(req, res, {
            message: "bad req"
        }, 400)
    } else {
        var opts = {
            maxResults: 10,
            type: 'youtube#video',
            key: "AIzaSyDKa8TDFwi9_6GoajhNKuUjmfiIbQIUDo8"
        }
        ytSearch(qry, opts, (err, result) => {
            if (err) return res.send(err)
            //res.send(JSON.stringify(result))
            res.render('search', {
                data: result
            })
        })
    }
})

function sendErrorResponse(req, res, err, code) {
    let accepts = req.headers['accept'];

    res.status(code);

    if (accepts.indexOf('*/*') != -1 || accepts.indexOf('application/json') != -1) {
        res.write(JSON.stringify({
            error: err.message,
            code: code
        }));
    } else {
        res.write(`<html>
        <head>
            <title>Error Occurred</title>
        </head>
        <body>
            <h1>Error Occurred: ${code}</h1>
            <p>${err.message}<p>
        </body>
    </html>`);
    }
    res.end();
}

module.exports = router;