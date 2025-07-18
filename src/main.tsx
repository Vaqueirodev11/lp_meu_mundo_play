import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Dashboard from './Dashboard.tsx'; // Importa a nova página
import './index.css';

// Cria as rotas da aplicação
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/testes-criados", // A sua URL secreta
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);