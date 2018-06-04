const ytdl = require('youtube-dl'),
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    download = require('download'),
    http = require('http'),
    convert = require('./convert')
router = express.Router();

router.get('/:qry', (req, res, next) => {
    let qry = req.params["qry"]
    if (qry === null) {
        sendErrorResponse(req, res, {
            message: "bad req"
        }, 400)
    } else {
        let youtubeUrl = "http://www.youtube.com/watch?v=" + qry

        ytdl.getInfo(youtubeUrl, (err, info) => {
            let video = ytdl(youtubeUrl)
            console.log('downloading')
            let file = fs.createWriteStream('public/video/'+info._filename)
            video.pipe(file).on('finish', function () {
                let output='public/audio/'+info.title+'.mp3'
                convert(info._filename,output,err=>{
                    if(err) return console.log(err);
		    let pathfile=info.title+'.mp3'
                    res.redirect('http://mrinalraj.com:5050/audio/'+pathfile)
                })
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
