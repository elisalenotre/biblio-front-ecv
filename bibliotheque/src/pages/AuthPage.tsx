import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'emprunteur') {
      navigate('/emprunteur');
    } else if (role === 'bibliothecaire') {
      navigate('/bibliothecaire');
    } else {
      alert('Veuillez choisir un rôle valide');
    }
  };

  return (
    <div>
      <h2>Authentification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choisir un rôle :
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">--Sélectionner--</option>
            <option value="emprunteur">Emprunteur</option>
            <option value="bibliothecaire">Bibliothécaire</option>
          </select>
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AuthPage;
