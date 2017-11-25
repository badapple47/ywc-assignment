import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import axios from 'axios'
import './home.css';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },

];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = function(value) { 
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : this.alldata.filter(lang =>
    lang.firstName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.firstName;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.firstName}
  </div>
);

class Home3 extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [] ,
      alldata : [
    
         {firstName: "ปฏิภาณ", lastName: 'นาครินทร์', major: 'programming', interviewRef: 'PG01'},
            
            
            {firstName: "จักรี", lastName: 'โล่พันธุ์ศิริกุล', major: 'programming', interviewRef: 'PG02'},
            
            
            {firstName: "ปฐมพงศ์", lastName: 'ไชยศรี', major: 'programming', interviewRef: 'PG03'},
            
            
            {firstName: "เอกลักษณ์", lastName: 'ลีละศรชัย', major: 'programming', interviewRef: 'PG04'}
        
        ]
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    getSuggestions.call(this);
    this.setState({
      suggestions: []

    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Home3;