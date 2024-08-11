import { FaPhone } from 'react-icons/fa6';
import { BsPersonFill } from 'react-icons/bs';
import s from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  return (
    <li className={s.container}>
      <div className={s.textwrap}>
        <p>
          <FaPhone />
          {name}
        </p>
        <p>
          <BsPersonFill />
          {number}
        </p>
      </div>
      <button className={s.button} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </li>
  );
}
