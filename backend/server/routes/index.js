const express = require('express');
const db = require('../db/categories.js')
const router = express.Router()

router.get('/', async (req, res, next) =>{
    try{
        console.log(db)
        let results = await db.all();
        res.json(results)
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})

module.exports = router