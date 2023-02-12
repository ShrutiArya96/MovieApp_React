import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Container } from '@mui/material';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Movies from './Components/Movies';
import Trending from './Components/Trending/Trending'
import Series from './Components/Series';
import { ThemeProvider } from '@mui/material/styles';
import {darkTheme} from './GlobalTheme.js';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <div className='app'>
          <Header/>
          <div style={{'marginTop':'95px'}}>
              <Routes>
                <Route path="/" element={
                  <Trending/>} exact/>
                <Route path='/Movies' element={<Movies/>}/>
                <Route path='/Series' element={<Series/>}/>
              </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
