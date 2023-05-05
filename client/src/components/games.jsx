import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './games.css';
import { Link } from 'react-router-dom';

const Games = ({ setShowUpdateForm }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/games')
      .then(res => {
        setGames(res.data);
      });
  }, []);

  const handleDelete = (game_id) => {
    axios.delete(`http://localhost:5000/deletegame/${game_id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {games.map(game => (
        <div className="col" key={game.game_id}>
          <div className="card h-100">
            <img src={game.thumbnail_url} className="card-img-top" alt={game.title} />
            <div className="card-body">
              <h5 className="card-title">{game.title}</h5>
              <p className="card-text">{game.desc}</p>
              <p className="card-text"><small className="text-muted">Publisher: {game.publisher}</small></p>
              <p className="card-text"><small className="text-muted">Release Date: {game.release_date}</small></p>
            </div>
            <div className="card-footer">
            <Link to={`/Update/${game.title}`} className="btn btn-primary me-2">Update</Link>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(game.game_id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Games;
