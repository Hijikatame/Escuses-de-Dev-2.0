import React, { useState } from 'react';
import axios from 'axios';
import './Style/AddExcusePage.css';

const AddExcusePage = () => {
  const [httpCode, setHttpCode] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/excuses', { http_code: httpCode, message })
      .then(response => {
        setFeedback('Excuse ajoutée avec succès');
        setHttpCode('');
        setMessage('');
      })
      .catch(error => {
        setFeedback('Erreur lors de l\'ajout de l\'excuse');
        console.error('Error adding excuse:', error);
      });
  };

  return (
    <div className="add-excuse-page">
      <h1>Ajouter une excuse</h1>
      <form onSubmit={handleSubmit} className="add-excuse-form">
        <div className="form-group">
          <label>Code HTTP:</label>
          <input 
            type="number" 
            value={httpCode} 
            onChange={(e) => setHttpCode(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Valider</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default AddExcusePage;