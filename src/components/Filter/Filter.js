import PropTypes from 'prop-types';
import './Filter.css';

const Filter = ({ value, onChangeFilter }) => (
  <div className="filterForm">
    <label htmlFor="find" className="filterLabel">
      Find contact by name
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
);

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
