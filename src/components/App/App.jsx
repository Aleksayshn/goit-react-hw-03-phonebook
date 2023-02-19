import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  Container,
  ContactForm,
  Filter,
  ContactList,
  Notification,
} from 'components';
import { Title } from './App.styled';
// import contacts from '../../contacts.json';


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert(`Contact ${name} already exists!`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
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
          <Filter value={filter} onFilterChange={this.filterChange} />
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