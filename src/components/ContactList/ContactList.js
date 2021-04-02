import React from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import './ContactList.css';
// import fadeStyles from '../../components/fade.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IconButton from '../IconButton';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';

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

					<IconButton
						className="ContactList__button"
						onClick={() => onDeleteContact(id)}
						aria-label="Remove Contact">

						<DeleteIcon
							width="12"
							height="12"
							fill="#fff" />
					</IconButton>
				</li>

			</CSSTransition>

		))}
	</TransitionGroup >
);

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.object),
	onDeleteContact: PropTypes.func,
};

export default ContactList;
