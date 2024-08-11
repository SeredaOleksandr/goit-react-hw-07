import { FaPhone } from 'react-icons/fa6';
import { BsPersonFill } from 'react-icons/bs';
import s from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

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
      <button className={s.button} onClick={() => handleDelete()}>
        Delete
      </button>
    </li>
  );
}
