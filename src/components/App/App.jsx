import React from 'react';
import { nanoid } from 'nanoid';
import {
  Container,
  ContactForm,
  Filter,
  ContactList,
  Notification,
} from 'components';
import { Title } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Alice Johnson', number: '555-1234' },
      { id: 'id-2', name: 'Bob Smith', number: '555-5678' },
      { id: 'id-3', name: 'Charlie Brown', number: '555-9012' },
      { id: 'id-4', name: 'David Lee', number: '555-3456' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert(`Contact ${name} already exists!`);
      return false;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    return true;
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getVisibleContacts();

    return (
      <Container title="Phonebook">
        <ContactForm onSubmit={this.addContact} />
        <Title>Contacts</Title>
        {contacts.length !== 0 && (
          <Filter filter={filter} onFilterChange={this.filterChange} />
        )}
        {filteredContacts.length !== 0 && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
        {contacts.length === 0 && (
          <Notification message="There are no contacts yet. Please, add someone!" />
        )}
        {contacts.length !== 0 && filteredContacts.length === 0 && (
          <Notification message="No contacts found..." />
        )}
      </Container>
    );
  }
}
