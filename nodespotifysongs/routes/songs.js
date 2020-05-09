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
        let strQuery = 'SELECT DISTINCT TITOLO, ARTISTA ' +  
            ' FROM SPOTIFYUSERS U INNER JOIN SPOTIFYSONGS S ' +
            ' ON U.ID = S.IDUTENTE ' +
            ' ORDER BY TITOLO, ARTISTA ';

        let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
        sqlRequest.query(strQuery,  function (err, result) { //Display error page
            if (err) {
                res.status(500).json({success: false, message:'Error while querying database', error:err});
                sql.close();
                return;
            };
            res.send(result.recordset); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
            sql.close();
        });
    });
});

router.post('/', function (req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.send( 'Errore: Inserire i parametri richiesti');
        return;
    }

    sql.connect(config, function(err) {
        let song = req.body;   
        let strQuery = `SELECT ID 
            FROM SPOTIFYUSERS WHERE UTENTE = '${song.UTENTE}' `;

        let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
        sqlRequest.query(strQuery, function (err, result) { //Display error page
            if (err) {
                res.status(500).json({success: false, message:'Error while querying database', error:err});
                sql.close();
                return;
            };
            
            if (result.recordset.length == 0) {
                res.send({ success: false, message: "Utente non esistente" });
                sql.close();
                return;
            }
            let idutente = result.recordset[0].ID
            let sqlInsert = `INSERT INTO dbo.[SPOTIFYSONGS] (TITOLO,ARTISTA,ALBUM,IDUTENTE) 
                                VALUES ('${song.TITOLO}','${song.ARTISTA}','${song.ALBUM}','${idutente}')`;                
            sqlRequest.query(sqlInsert, function(err, results) {
                if (err) {
                    res.status(500).json({success: false, message:'Error while querying database', error:err});
                    sql.close();
                    return;
                };
                res.send({ error: false, data: results, message: 'Canzone inserita con successo.' });
                sql.close();
            });
        });
    });
});

module.exports = router;

