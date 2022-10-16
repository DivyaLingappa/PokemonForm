import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import tick from '../../assets/tick.png';

const Modal = ({open, closeHandler}) => {
  const navigate = useNavigate();

  const onSubmit = e =>{
    e.preventDefault();
    window.localStorage.clear();
    navigate('/');
  }

  if(!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className='modal-background'>
        <div className='modal-dialog'>
            <img src={tick} className="modal-img" alt="TickImage"></img>
            <h2 className='modal-heading'>Thank you!!</h2>
            <p>Your details has been successfully submitted</p>
            <Link to='/'><button className='btn-modal-close' onClick={e=> onSubmit(e)}>OK</button></Link>
        </div>
      </div>
    </>,
  document.getElementById('portal'));
}

export default Modal;