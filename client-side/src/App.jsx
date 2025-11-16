/**
 * Main App Component
 */

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SalesProvider } from './context/SalesContext';
import AppRoutes from './routes/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SalesProvider>
          {/* Routes */}
          <AppRoutes />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#374151',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </SalesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;