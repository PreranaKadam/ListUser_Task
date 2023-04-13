import { createSlice } from '@reduxjs/toolkit';

const HomeSlice = createSlice({
    name: 'homeslice',
    initialState: {
        data: null,
        selectedUser: 0,
        isEditing: false,
        age: 0,
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
        },
        UpdateAge(state, action) {
            state.age = action.payload;
        },
    },
});

export default HomeSlice.reducer;
export const {
    fetchDataSuccess,
    UpdateSelectedUser,
    isEditing,
    UpdateFirstName,
    UpdateAge,
} = HomeSlice.actions;

