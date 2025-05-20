// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../App.module.css'; // ou crie um CSS próprio
import logo from '../assets/logo.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Sistema" className={styles.logo} />
      <h1 className={styles.title}>Sistema de Venda de Ingressos</h1>
      <p className={styles.subtitle}>
        Gerencie e compre ingressos para eventos de forma simples, segura e eficiente.
      </p>
      <button
        className={styles.buttonPrimary}
        onClick={() => navigate('/comprar')}
      >
        Comprar Ingressos
      </button>
    </div>
  );
}

export default Home;
