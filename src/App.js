import './App.css';
import 'modern-normalize/modern-normalize.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './components/Container';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
// import initialContacts from "./bd/contacts.json";
// import { CSSTransition } from 'react-transition-group';
import Notification from './components/Notification';
import Logo from './components/Logo';

export default class App extends Component {
	static defaultProps = {
		initialValue: 0,
	};

	static propTypes = {};

	state = {
		contacts: [],
		filter: '',
		message: null
	};

	setMessage = (note) => {
		this.setState({ message: note });
		setTimeout(() => {
			this.setState({ message: null });
		}, 2500);
	}

	addContact = (name, number) => {
		const contact = {
			id: uuidv4(),
			name,
			number,
		};

		if (name === '') {
			this.setMessage('Enter concact name, please!');
			return;
		}
		if (number === '') {
			this.setMessage('Enter concact phone number, please!');
			return;
		}
		if (this.state.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
			this.setMessage(`${name} is аlready exists in contacts !`);
			return;
		} 
		this.setState(prevState => {
			return { contacts: [contact, ...prevState.contacts], };
		});
	};

	deleteContact = contactId => {
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(contact => contact.id !== contactId),
			filter: ''
		}));
		// console.log(contactId);
	};

	changeFilter = event => {
		this.setState({ filter: event.currentTarget.value });
	};

	getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
  //   const normalizedContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  //  console.log(normalizedContacts); 
    let list = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    // if (!list.length) list = contacts
    // if (filter !== '' && list.length === 0) {
    //  alert('Sorry, nothing was found for your request.');
    // }
    return list
  };

	componentDidMount() {
		const contacts = localStorage.getItem('contacts');
		const parsedContacts = JSON.parse(contacts);

		if (parsedContacts) {
			this.setState({ contacts: parsedContacts });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.contacts !== prevState.contacts) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
		}
	}

	render() {
		const { filter, contacts, message } = this.state;
		const totalContactsCount = this.state.contacts.length;
		const visibleContacts = this.getVisibleContacts();
		
		return (
			<Container>

				<Logo />

				<Notification message={message} />

				<p>Total contacts count: {totalContactsCount}</p>

				<ContactForm onSubmit={this.addContact} />

				<Filter value={filter} onChangeFilter={this.changeFilter} contacts={contacts} />
			
				<ContactList
						contacts={visibleContacts}
						onDeleteContact={this.deleteContact}
					/>
			

			</Container>
		);
	}
}
