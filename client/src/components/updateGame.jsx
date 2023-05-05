import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateGame = () => {
  const { title } = useParams();
  const [game, setGame] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    publisher: '',
    release_date: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/games/${title}`)
      .then(res => {
        setGame(res.data);
        setFormData({
          title: res.data.title,
          desc: res.data.desc,
          publisher: res.data.publisher,
          release_date: res.data.release_date,
          thumbnail_url: res.data.thumbnail_url,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, [title]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updategame/${game.game_id}`, formData)
      .then(res => {
        console.log(res);
        window.location.href = '/';
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Update {title}</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea className="form-control" id="desc" name="desc" value={formData.desc} onChange={handleChange} required></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="publisher" className="form-label">Publisher</label>
        <input type="text" className="form-control" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="release_date" className="form-label">Release Date</label>
        <input type="date" className="form-control" id="release_date" name="release_date" value={formData.release_date} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="thumbnail_url" className="form-label">Thumbnail URL</label>
        <input type="text" className="form-control" id="thumbnail_url" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </div>
  );
};

export default UpdateGame;
