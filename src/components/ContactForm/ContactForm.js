import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import './ContactForm.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    //
  };

  static defaultProps = {};

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    if (name === '' || number === '') {
      alert('Enter data to each of inputs: [name & number] !!!');
    } else {
      this.props.onSubmit(name, number);

      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form className="ContactForm" onSubmit={this.handleSubmit}>
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            value={name}
            id="name"
            className="ContactForm__input"
            name="name"
            onChange={this.handleChange}
          />

          <label className="Label" htmlFor="number">
            Number
          </label>
          <input
            type="number"
            value={number}
            id="number"
            className="ContactForm__input"
            name="number"
            onChange={this.handleChange}
          />

          <button type="submit" className="ContactForm__button">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
