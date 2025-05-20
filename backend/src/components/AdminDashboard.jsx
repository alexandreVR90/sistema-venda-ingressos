import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token'); // Supondo token JWT salvo

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        alert('Erro ao carregar dashboard');
      }
    }
    fetchStats();
  }, [token]);

  if (!stats) return <p>Carregando dados...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Eventos Cadastrados</h2>
          <p className="text-3xl font-bold">{stats.totalEvents}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Ingressos Vendidos</h2>
          <p className="text-3xl font-bold">{stats.totalTickets}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Receita Total</h2>
          <p className="text-3xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Últimos Ingressos Vendidos</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-200">
            <th className="border p-2 text-left">Usuário</th>
            <th className="border p-2 text-left">Evento</th>
            <th className="border p-2 text-left">Categoria</th>
            <th className="border p-2 text-left">Preço</th>
            <th className="border p-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {stats.recentTickets.map((ticket) => (
            <tr key={ticket.id} className="even:bg-green-50">
              <td className="border p-2">{ticket.User.name}</td>
              <td className="border p-2">{ticket.Event.name}</td>
              <td className="border p-2">{ticket.category}</td>
              <td className="border p-2">R$ {ticket.price.toFixed(2)}</td>
              <td className="border p-2">{new Date(ticket.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
