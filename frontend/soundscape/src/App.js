import './App.css';
import LoginForm from './components/LoginForm';
import axios from 'axios';

function App() {
  const getMe = async () => {
    const response = await axios.get('http://localhost:8000/isuser/', {
      withCredentials: true,
    });
    console.log(response.data);
  };
  return (
    <>
      Hello World
      <LoginForm />
      <button onClick={getMe}>WhoTFAMi</button>
    </>
  );
}

export default App;
