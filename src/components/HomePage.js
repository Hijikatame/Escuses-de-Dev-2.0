import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style/HomePage.css';

const HomePage = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/excuses')
      .then(response => {
        setExcuses(response.data);
        setLoading(false);
        setTimeout(() => {
          setButtonVisible(true);
        }, 2000);
      })
      .catch(error => {
        console.error('Error fetching excuses:', error);
        setLoading(false);
      });
  }, []);

  const getRandomExcuse = () => {
    setShowLoader(true);
    setCurrentExcuse('');
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;

    setTimeout(() => {
      if (excuses.length === 0) return;
      const randomIndex = Math.floor(Math.random() * excuses.length);
      const randomExcuse = excuses[randomIndex];
      setCurrentExcuse(randomExcuse.message);
      setShowLoader(false);
    }, randomDelay);
  };

  return (
    <div className="homepage">
      <h1 className="title">Excuses de Dev</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {buttonVisible && (
            <>
              <button onClick={getRandomExcuse} className="generate-button">Générer une excuse</button>
              <Link to="/add">
                <button className="add-excuse-button">Ajouter une excuse</button>
              </Link>
            </>
          )}
          {showLoader && <div className="loader">Loading...</div>}
          {!showLoader && currentExcuse && <p className="excuse">{currentExcuse}</p>}
        </div>
      )}
    </div>
  );
};

export default HomePage;