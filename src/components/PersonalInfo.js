import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PersonalInfo = () => {
  let storedItems = {};
  const navigate = useNavigate();
  
  if(window.localStorage.getItem('formDetails') !== null){
    storedItems = JSON.parse(window.localStorage.getItem('formDetails'));
  }

  const [formData, setFormData] = useState({
        fname:'' || storedItems.fname,
        lname:'' || storedItems.lname,
        mobile:'' || storedItems.mobile,
        address:'' || storedItems.address
      });
  const { fname, lname, mobile, address} = formData;
  const [formErrors, setFormErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const onChange = e =>{
    setFormData({ ...formData, [e.target.name]:e.target.value});
  }

  const validate = (values) =>{
    const errors = {};
    if(!values.fname) {
      errors.fname = "First name is required!";
    }else if(values.fname.length <3){
      errors.fname = "Please enter a valid First name!";
    }
    if(!values.lname) {
      errors.lname = "Last name is required!";
    }else if(values.lname.length <3){
      errors.lname = "Please enter a valid Last name!";
    }
    if(!values.mobile) {
      errors.mobile = "Phone number is required!";
    }else if(values.mobile.length < 10 || values.mobile < 0){
      errors.fname = "Please enter a valid Phone number!";
    }
    if(!values.address) {
      errors.address = "Address is required!";
    }
    return errors;
  }

  const onSubmit = e =>{
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsValidated(true);
  }

  useEffect(()=>{
    if(Object.keys(formErrors).length === 0 && isValidated) {
      window.localStorage.setItem('formDetails', JSON.stringify(formData));
      navigate('/selectpokemon');
    }
  },[formErrors]);

  return (
    <div className = "form-container">
        <div className="form-header">
            <h1>Personal Info</h1>
        </div>
        <div className="form-body">
            <form className="personal-info-header">
                <fieldset className="inputbox">
                  <p className="form-errors">{formErrors.fname}</p>
                  <input type="text" placeholder="First Name" name='fname' value={fname || ""} onChange={e=> onChange(e)} required />         
                </fieldset>
                <fieldset className="inputbox">
                  <p className="form-errors">{formErrors.lname}</p>
                  <input type="text" placeholder="Last Name" name='lname' value={lname || ""} onChange={e=> onChange(e)} required />         
                 </fieldset>
                <fieldset className="inputbox">
                  <p className="form-errors">{formErrors.mobile}</p>
                  <input type="text" placeholder="Phone Number" name='mobile' value={mobile  ||""} onChange={e=> onChange(e)} required />         
                </fieldset>
                <fieldset className="inputbox">
                  <p className="form-errors">{formErrors.address}</p>
                  <input type="text" placeholder="Address" name='address' value={address  || ""} onChange={e=> onChange(e)} required />         
                </fieldset>
            </form>
        </div>
        <div className="info-button">
           <button type="submit" onClick={(e)=>onSubmit(e)}>Next</button>
        </div>
    </div>
   
  );
}

export default PersonalInfo;
