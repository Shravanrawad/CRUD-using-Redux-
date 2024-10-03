import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showuser, deleteuser } from '../redux/features/userSlice';
import { Link } from 'react-router-dom';

function Read() {
  
  const dispatch = useDispatch();
  const { users, loading, error, searchData } = useSelector((state) => state.app); 

  React.useEffect(() => {
    dispatch(showuser());
  }, [dispatch])

  const filteredUsers = users?.filter((user) => 
    user.name.toLowerCase().includes(searchData.toLowerCase()) ||
    user.email.toLowerCase().includes(searchData.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-list">
     
      {filteredUsers && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <div className="button-group">
              <Link to={'/edit/' + user.id}>
                <button className="edit-button">Edit</button>
              </Link>
              <button className="delete-button" onClick={() => dispatch(deleteuser(user.id))}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Read;
