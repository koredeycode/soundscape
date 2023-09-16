import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { useAuth } from './hooks/AuthContext';

function App() {
  // const [user, setUser] = useState(null);
  const { auth } = useAuth();
  console.log(auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
          }
        />
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
