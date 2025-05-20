import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../App.module.css';
import axios from 'axios';

const MAX_QUANTITY = 10;

const BuyTicketPage = () => {
  const [events, setEvents] = useState([]);
  const [quantities, setQuantities] = useState({}); // para controlar a qtd de cada evento
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Erro ao carregar eventos:', err));
  }, []);

  const handleQuantityChange = (eventId, value) => {
    const qty = Math.min(Math.max(Number(value), 0), MAX_QUANTITY);
    setQuantities(prev => ({ ...prev, [eventId]: qty }));
  };

  const handleBuy = (event) => {
    const qty = quantities[event.id] || 0;
    if (qty < 1) {
      alert('Selecione pelo menos 1 ingresso.');
      return;
    }
    alert(`Você comprou ${qty} ingresso(s) para o evento "${event.title}".`);
    // Aqui você pode continuar para checkout, adicionar ao carrinho, etc.
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comprar Ingressos</h1>
      <p className={styles.subtitle}>Escolha o evento e prossiga com a compra</p>

      {events.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>Nenhum evento disponível no momento.</p>
      ) : (
        <div className={styles.cardList}>
          {events.map(event => (
            <div key={event.id} className={styles.card}>
              <h2>{event.title}</h2>
              <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Local:</strong> {event.location}</p>

              <div style={{ margin: '1rem 0' }}>
                <label htmlFor={`qty-${event.id}`}>Quantidade:</label>
                <input
                  id={`qty-${event.id}`}
                  type="number"
                  min="0"
                  max={MAX_QUANTITY}
                  value={quantities[event.id] || 0}
                  onChange={e => handleQuantityChange(event.id, e.target.value)}
                  style={{ 
                    width: '60px', 
                    marginLeft: '0.5rem', 
                    padding: '0.25rem', 
                    borderRadius: '6px', 
                    border: '1px solid #ccc',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                className={styles.buttonPrimary}
                onClick={() => handleBuy(event)}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className={styles.buttonSecondary}
        style={{ marginTop: '2rem' }}
      >
        ← Voltar
      </button>
    </div>
  );
};

export default BuyTicketPage;
