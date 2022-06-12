import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await axios.post('/auth/login', data);

    const { token } = res.data;
    localStorage.setItem('token', token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserLogin = createAsyncThunk(
  'auth/getUserLogin',
  async (_, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const res = await axios.get('/users/userLogin', config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (data, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      await axios.put(`/users`, data, config);
      const res = await axios.get('/users/userLogin', config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const savePost = createAsyncThunk(
  'posts/savePost',
  async (id, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      await axios.put(`/users/${id}/save`, {}, config);

      const res = await axios.get('/users/userLogin', config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(getUserLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userLogin = true;
    });
    builder.addCase(getUserLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(savePost.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;
