import React, {useState} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Modal from './layout/Modal';

const Review = () => {
  let storedForm = {};
  let storedPokemon = '';
  storedForm = JSON.parse(window.localStorage.getItem('formDetails'));
  storedPokemon = JSON.parse(window.localStorage.getItem('pokemon'));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickHandler = (e) =>{
    e.preventDefault();
    setIsModalOpen(true)
  }

  return (
    <>
    <Modal open={isModalOpen} />
    <div className = "form-container">
      <div className="form-header">
        <h1>Review your details</h1>
      </div>
      <div className="form-body">
        <div className="review-box">
          <span>First Name</span> : {storedForm.fname}         
        </div>
        <div className="review-box">
          <span>Last Name</span> : {storedForm.lname}           
        </div>
        <div className="review-box">
          <span>Phone Number</span> : {storedForm.mobile}           
        </div>
        <div className="review-box">
          <span>Address</span> : {storedForm.address}           
        </div>
        <div className="review-box">
          <span>Favourite Pokemon</span> : {storedPokemon}         
        </div>
      </div>
      <div className="select-buttons">
         <Link to='/selectpokemon'><button>Prev</button></Link>
         <button type="submit" onClick={(e)=>clickHandler(e)}>Submit</button>
      </div>
    </div>
    </>
  );
}

export default Review;
