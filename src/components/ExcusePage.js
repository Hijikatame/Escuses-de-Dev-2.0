import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExcusePage = () => {
  const { http_code } = useParams();
  const [excuse, setExcuse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/${http_code}`)
      .then(response => {
        setExcuse(response.data);
        setLoading(false);
      })
      .catch(error => {
        setExcuse('Excuse non trouvée');
        setLoading(false);
      });
  }, [http_code]);

  return (
    <div>
      {loading ? <p>Chargement...</p> : <p>{excuse}</p>}
    </div>
  );
};

export default ExcusePage;