import { createSlice, nanoid } from '@reduxjs/toolkit';
import items from '../contact.json';

const initialState = {
  contacts: {
    items: items,
    isLoading: false,
    isError: false,
  },
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.contacts.items.push(action.payload);
      },
      prepare: contact => {
        return { payload: { ...contact, id: nanoid() } };
      },
    },
    deleteContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const contactsReducer = slice.reducer;
export const { addContact, deleteContact } = slice.actions;
