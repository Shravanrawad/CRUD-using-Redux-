import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createuser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [users, setusers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledata = (e) => {
    setusers({ ...users, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(createuser(users));
    console.log(users);
    navigate('/read')
  };

  return (
    <div className='mt-2'>
      <form className='w-50 mx-auto' onSubmit={handlesubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            id='name'
            placeholder='Enter your name'
            onChange={handledata}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='age' className='form-label'>Age</label>
          <input
            type='text'
            name='age'
            className='form-control'
            id='age'
            placeholder='Enter your age'
            onChange={handledata}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input
            type='text'
            name='email'
            className='form-control'
            id='email'
            placeholder='Enter your email'
            onChange={handledata}
          />
        </div>

        <div className='w-100 mx-auto'>
          <div className='form-check'>
            <input
              className='form-check-input'
              name='gender'
              value='male'
              type='radio'
              onChange={handledata}
            />
            <label className='form-check-label' htmlFor='male'>Male</label>
          </div>

          <div className='form-check'>
            <input
              className='form-check-input'
              name='gender'
              value='female'
              type='radio'
              onChange={handledata}
            />
            <label className='form-check-label' htmlFor='female'>Female</label>
          </div>

          <button type='submit' className='btn mt-2 btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
