import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
export const selectContacts = state => state.contacts.items;
export const selectNameFilter = state => state.filter.name;
