import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalInfo from './components/PersonalInfo';
import SelectPokeMon from './components/SelectPokeMon';
import Review from './components/Review';
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path='/' element={<PersonalInfo />} />
          <Route path='/selectpokemon' element={<SelectPokeMon />} />
          <Route path='/review' element={<Review />} />
        </Routes> 
     </Fragment>
    </BrowserRouter>
  );
}

export default App;
