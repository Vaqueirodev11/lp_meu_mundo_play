import React, { useState, useEffect } from 'react';
import { Eye, MousePointerClick } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [visits, setVisits] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);

  useEffect(() => {
    // Carrega os dados do localStorage quando o componente é montado
    const savedVisits = parseInt(localStorage.getItem('siteVisits') || '0', 10);
    const savedClicks = parseInt(localStorage.getItem('testClicks') || '0', 10);
    
    setVisits(savedVisits);
    setClicks(savedClicks);
  }, []);

  const clearStats = () => {
    localStorage.setItem('siteVisits', '0');
    localStorage.setItem('testClicks', '0');
    setVisits(0);
    setClicks(0);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Métricas - Meu Mundo Play</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card de Acessos */}
          <div className="bg-blue-50 p-6 rounded-lg flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-semibold">Acessos Totais no Site</p>
              <p className="text-3xl font-bold text-blue-900">{visits}</p>
            </div>
          </div>

          {/* Card de Cliques */}
          <div className="bg-green-50 p-6 rounded-lg flex items-center space-x-4">
            <div className="bg-green-500 p-3 rounded-full">
              <MousePointerClick className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-800 font-semibold">Testes Gerados (Cliques)</p>
              <p className="text-3xl font-bold text-green-900">{clicks}</p>
            </div>
          </div>

        </div>
        <div className="mt-8 text-center">
            <button 
                onClick={clearStats}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
                Zerar Estatísticas
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;