
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
        <div className="App">
      <Header/>
        <Home/>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
