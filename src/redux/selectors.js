import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
// export const selectContacts = state => state.contacts.items;
export const selectContacts = state => state.contacts.contacts.items;
// export const selectNameFilter = state => state.contacts.name;
export const selectNameFilter = state => state.filter.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);
