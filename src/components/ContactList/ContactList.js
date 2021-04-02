import React from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import './ContactList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ContactList = ({ contacts, onDeleteContact }) => (
	<TransitionGroup component="ul" className="ContactList">
		{contacts.map(({ id, name, number }) => (
			<CSSTransition
				key={id}
				timeout={250}
				classNames="ContactList__item-fade">
				<li key={id} className="ContactList__item">
					<p className="ContactList__name">
						{name}: {number}
					</p>
					<button
						className="ContactList__button"
						onClick={() => onDeleteContact(id)}
						aria-label="Remove Contact">
						>
						Remove
					</button>
				</li>
			</CSSTransition>
		))}
	</TransitionGroup>
);

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.object),
	onDeleteContact: PropTypes.func,
};

export default ContactList;
