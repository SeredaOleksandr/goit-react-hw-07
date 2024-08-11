import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import {
  selectFilteredContacts,
  selectIsError,
  selectIsLoading,
  selectNameFilter,
} from '../../redux/selectors';
import { useEffect } from 'react';
import { getContacts } from '../../redux/contactsOps';
import { toast } from 'react-toastify';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectNameFilter) || ''; // Додамо перевірку на випадок, якщо filter є undefined

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      const notifyPromise = new Promise((resolve, reject) => {
        !isError ? resolve() : reject();
      });

      toast.promise(notifyPromise, {
        loading: 'Loading',
        success: 'Successfully completed!',
        error: 'Oops, please reload the page!',
      });
    }
  }, [isLoading, isError]);

  return (
    <ul className={s.contactList}>
      {contacts.length > 0
        ? contacts.map(contact => <Contact key={contact.id} {...contact} />)
        : !isLoading && !isError && <p>Contacts not found</p>}
    </ul>
  );
}
