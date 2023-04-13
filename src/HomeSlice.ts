import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store/store';

const HomeSlice = createSlice({
    name: 'homeslice',
    initialState: {
        data: null,
        selectedUser: 0,
        isEditing: false,
    },
    reducers: {
        fetchDataSuccess(state, action) {
            state.data = action.payload;
        },
        UpdateSelectedUser(state, action) {
            state.selectedUser = action.payload;
            console.log(state.selectedUser);
        },
        isEditing(state, action) {
            state.isEditing = action.payload;
        },
        UpdateFirstName(state: any, action) {
            state.data.map((user: any) => {
                if (user.id === state.selectedUser) {
                    user.first = action.payload;
                }
            })
        }
    },
});

export default HomeSlice.reducer;
export const {
    fetchDataSuccess,
    UpdateSelectedUser,
    isEditing,
    UpdateFirstName,
} = HomeSlice.actions;

