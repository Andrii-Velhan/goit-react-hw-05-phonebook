import './App.css';
import 'modern-normalize/modern-normalize.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './components/Container';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
// import initialContacts from "./bd/contacts.json";

export default class App extends Component {
	static defaultProps = {
		initialValue: 0,
	};

	static propTypes = {};

	state = {
		contacts: [],
		filter: '',
	};

	addContact = (name, number) => {
		const contact = {
			id: uuidv4(),
			name,
			number,
		};

		this.state.contacts.find(
			// item => item.name === name,
			item => item.name.toLowerCase() === name.toLowerCase(),
		)
			? alert(`${name} is аlready exists in contacts !!!`)
			: this.setState(({ contacts }) => ({
				contacts: [contact, ...contacts],
			}));
	};

	deleteContact = contactId => {
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(contact => contact.id !== contactId),
		}));
		// console.log(contactId);
	};

	changeFilter = event => {
		this.setState({ filter: event.currentTarget.value });
	};

	// getVisibleContacts = () => {
	//   const { contacts, filter } = this.state;
	//   const normalizedFilter = filter.toLowerCase();

	//   return normalizedFilter.length > 0
	//     ? this.state.contacts.filter(contact =>
	//         contact.name.toLowerCase().includes(normalizedFilter),
	//       )
	//     : this.state.contacts;
	// };

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
		const { filter } = this.state;
		const normalizedFilter = filter.toLowerCase();
		const totalContactsCount = this.state.contacts.length;
		const visibleContacts =
			normalizedFilter.length > 0
				? this.state.contacts.filter(contact =>
					contact.name.toLowerCase().includes(normalizedFilter),
				)
				: this.state.contacts;

		return (
			<Container>
				<h1>Phonebook</h1>
				<p>Total contacts count: {totalContactsCount}</p>
				<ContactForm onSubmit={this.addContact} />
				<h2>Contacts</h2>
				<Filter value={filter} onChangeFilter={this.changeFilter} />
				<ContactList
					contacts={visibleContacts}
					onDeleteContact={this.deleteContact}
				/>
			</Container>
		);
	}
}
