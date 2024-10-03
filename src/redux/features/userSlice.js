import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createuser = createAsyncThunk('createuser', async (state, { rejectWithValue }) => {
  try {
    const response = await fetch('https://66fbb8fc8583ac93b40cec5b.mockapi.io/crud', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const edituser = createAsyncThunk('useredit', async (state, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://66fbb8fc8583ac93b40cec5b.mockapi.io/crud/${state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const showuser = createAsyncThunk('showuser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://66fbb8fc8583ac93b40cec5b.mockapi.io/crud', {
      method: 'GET'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});

export const deleteuser = createAsyncThunk('deleteuser', async ( id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://66fbb8fc8583ac93b40cec5b.mockapi.io/crud/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});

const userDetails = createSlice({

  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: []
  },

  reducers: {
     searchuser : (state, action) => {
         state.searchData = action.payload;
     }
  },

  extraReducers: (builder) => {
    
    builder

      .addCase(createuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createuser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      })

      .addCase(edituser.pending, (state) => {
        state.loading = true;
      })
      .addCase(edituser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
      })   
      .addCase(edituser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      })
      
      .addCase(showuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showuser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      })

      .addCase(deleteuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.loading = false;
        const {id} = action.payload
        if(id){
          state.users = state.users.filter(user => user.id !== id);
        }
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      });

  },
});


export default userDetails.reducer;
export const {searchuser} = userDetails.actions