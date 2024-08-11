import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { selectContacts, selectNameFilter } from '../../redux/selectors';

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.contactList}>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} {...contact} />
      ))}
    </ul>
  );
}
