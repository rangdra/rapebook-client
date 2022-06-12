import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentId: 0,
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/posts');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyPosts = createAsyncThunk(
  'posts/getMyPosts',
  async (_, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const res = await axios.get('/posts/find/my-posts', config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const res = await axios.post('/posts', data, config);
      const post = await axios.get(`/posts/${res.data._id}`);

      return post.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ comment, id }, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      await axios.post(`/comments/${id}`, { comment }, config);
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, body, imagePost }, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      await axios.put(`/posts/${id}`, { body, imagePost }, config);
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      await axios.delete(`/posts/${id}`, config);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ commentId, postId }, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      await axios.delete(`/comments/${commentId}`, config);
      const res = await axios.get(`/posts/${postId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      await axios.put(`/posts/${id}/like`, {}, config);
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(getMyPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(createPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(updatePost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.loading = false;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.loading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });
  },
});

export const { setCurrentId } = postSlice.actions;
export default postSlice.reducer;
