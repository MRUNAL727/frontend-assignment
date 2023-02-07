import { configureStore, createSlice, current} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn:false,
    isLoggedOut:true,
    user:''
}

const slice = createSlice({
    name: 'user',     //name of the slice
    initialState, 
    reducers: {
        isLoggedIn:(state, action)=>{
          state.isLoggedIn = true;
          state.user = action.payload
          state.isLoggedOut = false;
        //   console.log(action.payload);
            console.log(current(state));
        },
        isLoggedOut:(state)=>{
            state.isLoggedIn = false;
            state.user = ''
            state.isLoggedOut = true;
            console.log(current(state));

        }
        
    }
})

export const store = configureStore({
  reducer: {
     user: slice.reducer
  },
});


export const { isLoggedIn, isLoggedOut } = slice.actions
