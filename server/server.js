const express = require('express');
const path = require('path');
const cors = require("cors")

const PORT = 5000;
const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors())
app.use(express.json())
const {connection}= require('./database/index');

app.get('/games',  (req, res) => {
 connection.query('SELECT * FROM gamesinfo', function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
}
)

app.get('/games/:title', (req, res) => {
  const { title } = req.params;
  connection.query(
    'SELECT * FROM gamesinfo WHERE title = ?', [title], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});



app.post("/addgame", (req, res) => {
const { title, desc ,publisher,release_date,thumbnail_url } = req.body
  connection.query("INSERT INTO gamesinfo SET ?",{ title, desc ,publisher,release_date,thumbnail_url }, (err) => {
    if (err) return res.send(err)
    res.send("Game added")
  });
});






app.delete("/deletegame/:game_id" , (req , res ) => {
  const {game_id} = req.params
connection.query("DELETE from gamesinfo WHERE game_id = ?" , game_id  , (err) => {
  if (err) {  console.log(err);}
else {res.send("Game deleted ") }

}) 
})


app.put('/updategame/:game_id', (req, res) => {
  const { game_id } = req.params;
  const { title, desc, publisher, release_date, thumbnail_url } = req.body;
  connection.query(
    "UPDATE gamesinfo SET title = ?, `desc` = ?, publisher = ?, release_date = ?, thumbnail_url = ? WHERE game_id = ?",
    [title, desc, publisher, release_date, thumbnail_url, game_id],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Game updated: ${title}`);
        res.send('Game updated');
      }
    }
  );
});




app.listen(PORT,()=>console.log(`Server listening on port : ${PORT}`))

  
