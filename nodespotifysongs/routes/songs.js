var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: '4dd_22',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_22', //(Nome del DB)
}

/* GET songs listing. */
router.get('/', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query 
    let strQuery = 'SELECT UTENTE, TITOLO, ARTISTA, ALBUM ' +  
        ' FROM SPOTIFYUSERS U INNER JOIN SPOTIFYSONGS S ' +
        ' ON U.ID = S.IDUTENTE ' +
        ' ORDER BY UTENTE, TITOLO';
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query(strQuery,  (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
  });
});

module.exports = router;

