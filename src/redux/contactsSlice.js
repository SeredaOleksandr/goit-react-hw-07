import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contactsOps';
import { selectContacts, selectNameFilter } from './selectors';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [], // Зберігаємо контакти тут
    isLoading: false,
    isError: null,
  },
  reducers: {
    resetFlags: state => {
      state.added = false;
      state.deleted = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.items = action.payload; // Оновлюємо items, а не contacts
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload); // Пушимо у items
        state.added = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.deleted = true;
      })
      .addMatcher(
        isAnyOf(getContacts.pending, addContact.pending, deleteContact.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
export const { resetFlags } = slice.actions;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    const normalizedFilter = nameFilter ? nameFilter.toLowerCase() : ''; // Додаємо перевірку на undefined
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);
