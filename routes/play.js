const express = require('express'),
    router = express.Router(),
    ytPlay = require('youtube-audio-stream');

router.get('/:id',(req,res)=>{
    let id = req.params['id']
    if(id){
        let url  = 'https://youtube.com/watch?v='+id
        try{
            ytPlay(url).pipe(res)
        }
        catch (e){
            res.status(500).send(e)
        }
    }
})