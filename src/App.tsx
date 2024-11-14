// src/App.tsx

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './context/AuthContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
