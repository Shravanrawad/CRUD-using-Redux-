import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { edituser } from '../redux/features/userSlice';

function Edit() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { users, loading } = useSelector(state => state.app);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id && users) {
      const singleUser = users.find(user => user.id === id); 
      setUser(singleUser);
    }
  }, [id, users]);

  const newdata = (e) => {
    setUser({...user, [e.target.name] : e.target.value});  
  } 

  const handeledit = (e) => {
        e.preventDefault();
        dispatch(edituser(user));
        navigate('/read');
  }
  if(loading){
    <div>
      loading
    </div>
  }

  return (
    <div className='mt-2'>
      <form className='w-50 mx-auto' onSubmit={handeledit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            id='name'
            placeholder='Enter your name'
            value={user ? user.name : ''}
            onChange={newdata} 
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
            value={user ? user.age : ''}
            onChange={newdata} 
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
            value={user ? user.email : ''}
            onChange={newdata} 
          />
        </div>

        <div className='w-100 mx-auto'>
          <div className='form-check'>
            <input
              className='form-check-input'
              name='gender'
              value='male'
              type='radio'
              checked={user ? user.gender === 'male' : false}
              onChange={newdata}
            />
            <label className='form-check-label' htmlFor='male'>Male</label>
          </div>

          <div className='form-check'>
            <input
              className='form-check-input'
              name='gender'
              value='female'
              type='radio'
              checked={user ? user.gender === 'female' : false}
              onChange={newdata} 
            />
            <label className='form-check-label' htmlFor='female'>Female</label>
          </div>

          <button type='submit' className='btn mt-2 btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit;
