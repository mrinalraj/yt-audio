const yt = require('youtube-node'),
    ytd = new yt();

ytd.setKey('AIzaSyDKa8TDFwi9_6GoajhNKuUjmfiIbQIUDo8')
ytd.search('nagarpalika', 1, (err, results) => {
    if (err) return console.log(err);
    console.log(JSON.stringify(results))
})