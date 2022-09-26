const pool = require('./index.js')
let db = {}

db.all = () =>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM CelestialObject', (err, results) => {
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}
module.exports = db