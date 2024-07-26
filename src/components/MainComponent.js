import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExcuseButton from './ExcuseButton';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Pour éviter les avertissements d'accessibilité

const MainComponent = () => {
  const [excuse, setExcuse] = useState('');
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newExcuse, setNewExcuse] = useState('');

  useEffect(() => {
    fetch('/excuses')
      .then(response => response.json())
      .then(data => setExcuses(data));
  }, []);

  const generateExcuse = () => {
    setLoading(true);
    // Simuler un délai de chargement aléatoire entre 1 et 5 secondes
    const randomDelay = Math.floor(Math.random() * 4000) + 1000; // entre 1000ms et 5000ms
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * excuses.length);
      setExcuse(excuses[randomIndex].message);
      setLoading(false);
    }, randomDelay);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddExcuse = () => {
    fetch('/excuses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ http_code: Date.now(), message: newExcuse }), // Utilisation de Date.now() pour générer un code HTTP unique
    })
    .then(response => {
      if (response.ok) {
        return fetch('/excuses'); // Recharger la liste des excuses après ajout
      } else {
        throw new Error('Erreur lors de l\'ajout de l\'excuse');
      }
    })
    .then(response => response.json())
    .then(data => {
      setExcuses(data);
      setNewExcuse('');
      closeModal();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Les excuses de Dev
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>{excuse}</p>
      </motion.div>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ExcuseButton onClick={generateExcuse} />
          <button onClick={openModal} style={{ marginLeft: '10px' }}>
            Ajouter une excuse
          </button>
        </motion.div>
      )}
      {loading && (
        <div style={{ marginTop: '20px' }}>
          <div className="loader"></div>
          <p>Chargement...</p>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ajouter une excuse"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '400px',
          }
        }}
      >
        <h2>Ajouter une nouvelle excuse</h2>
        <textarea
          value={newExcuse}
          onChange={(e) => setNewExcuse(e.target.value)}
          placeholder="Entrez votre excuse ici"
          rows="4"
          style={{ width: '100%' }}
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleAddExcuse}>Valider</button>
          <button onClick={closeModal} style={{ marginLeft: '10px' }}>Annuler</button>
        </div>
      </Modal>
    </div>
  );
};

export default MainComponent;