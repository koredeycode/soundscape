import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [auth, setAuth] = useState(false);
  return !auth ? <LoginForm appauth={setAuth} /> : <Dashboard />;
}

export default App;
