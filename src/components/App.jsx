
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm, ContactList, Filter } from 'components';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFirstRender, setisFirstRender] = useState(true);

  const addContact = (name, number) => {
    const duplicatedContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicatedContact) {
      return alert(`${duplicatedContact.name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
    setisFirstRender(false);
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, isFirstRender]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
};

export default App;