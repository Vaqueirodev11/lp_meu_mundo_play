,import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 4500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      // AQUI ESTÃO AS ALTERAÇÕES DE ESTILO:
      className={`fixed bg-white text-gray-800 rounded-lg p-4 flex items-center space-x-3 transition-all duration-500 transform
                 shadow-lg         // 1. Sombra ("shadow box") adicionada
                 left-4 right-4    // 2. Margens laterais definidas para alinhar com o botão
                 bottom-24         // Posição vertical para não sobrepor o botão
                 md:bottom-5 md:left-5 md:right-auto // Estilos para ecrãs maiores
                 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                `}
      style={{ zIndex: 100 }}
    >
      <div className="bg-brand-accent p-2 rounded-full">
        <Film className="w-5 h-5 text-white" />
      </div>
      <p className="text-sm" dangerouslySetInnerHTML={{ __html: message }}></p>
    </div>
  );
};

export default Notification;