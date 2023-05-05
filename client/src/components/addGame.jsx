import React, { useState } from 'react';
import axios from 'axios';
import "./games.css"

const AddGame = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [publisher, setPublisher] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = { title, desc, publisher, release_date: releaseDate, thumbnail_url: thumbnailUrl };
    axios.post('http://localhost:5000/addgame', newGame)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="add-game-container">
      <h1>Add your game : </h1>
<form onSubmit={handleSubmit} className="form-container">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea className="form-control" id="desc" rows="3" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="publisher" className="form-label">Publisher</label>
        <input type="text" className="form-control" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="releaseDate" className="form-label">Release Date</label>
        <input type="date" className="form-control" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="thumbnailUrl" className="form-label">Thumbnail URL</label>
        <input type="text" className="form-control" id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Game</button>
    </form>
    </div>
  )
}

export default AddGame;
