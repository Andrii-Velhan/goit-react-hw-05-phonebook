import PropTypes from 'prop-types';
import './Filter.scss';
import { CSSTransition } from 'react-transition-group'

const Filter = ({ value, onChangeFilter, contacts }) => (
	<CSSTransition
		in={contacts.length > 1}
		timeout={250}
		classNames="Filter-fade"
		unmountOnExit>

		<div className="filterForm">
			<label htmlFor="find" className="Label filterLabel">
				Find contacts by name
    </label>
			<input
				type="text"
				value={value}
				id="find"
				className="filterInput"
				onChange={onChangeFilter}
			// onChange={event => onChangeFilter(event.target.value)}
			/>
		</div>
	 </CSSTransition>
);

Filter.propTypes = {
	value: PropTypes.string,
	onChangeFilter: PropTypes.func,
};

export default Filter;
