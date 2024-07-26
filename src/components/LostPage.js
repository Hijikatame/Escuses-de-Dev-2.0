import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/LostPage.css';

const LostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="lost-page">
      <h1>Lost</h1>
      <img src="/images/please-wait.gif" alt="Lost" />
    </div>
  );
};

export default LostPage;