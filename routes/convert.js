var ffmpeg = require('fluent-ffmpeg');

function convert(input, output, callback) {
    ffmpeg(input)
        .output(output)
        .on('end', function() {                    
            console.log('conversion ended');
            callback(null);
        }).on('error', function(err){
            console.log('error: ', err.code, err.msg);
            callback(err);
        }).run();
}

module.exports = convert;
