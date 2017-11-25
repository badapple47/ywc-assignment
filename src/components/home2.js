import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import axios from 'axios'
import './home.css';
// import theme from './theme.css';

// Imagine you have a list of languages that you'd like to autosuggest.




const languages = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   },

 {firstName: "ปฏิภาณ", lastName: 'นาครินทร์', major: 'programming', interviewRef: 'PG01'},
    
    
    {firstName: "จักรี", lastName: 'โล่พันธุ์ศิริกุล', major: 'programming', interviewRef: 'PG02'},
    
    
    {firstName: "ปฐมพงศ์", lastName: 'ไชยศรี', major: 'programming', interviewRef: 'PG03'},
    
    
    {firstName: "เอกลักษณ์", lastName: 'ลีละศรชัย', major: 'programming', interviewRef: 'PG04'}

];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
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

class Home2 extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {

        //from auto seggestion
      value: '',
      suggestions: [],

      //from home ที่ทำ
      data: [],
      count: [],
      programming: [],
      marketing: [],
      design: [],
      content: []
    };

    this.sendgetRequest = this.sendgetRequest.bind(this);


  }


  componentDidMount() {
    this.sendgetRequest();
    // console.log(this.state.programming + this.state.cont)

}


sendgetRequest() {

    console.log("sendgetRequest triggered")

    if (this.data == null) {
        axios.get('https://ywc15.ywc.in.th/api/interview')
            .then((response) => {
                console.log(response.data);
                this.setState({ data: response.data })
                console.log(this.state.data[0].major)

                { this.splitdata() }

            })
            .then(() => {
                console.log("second then")
                console.log(this.state.data.length)
                this.state.programming.push({ firstName: "พิษณุ", lastName: "โพคา", major: "programming", interviewRef: "PG55" })
                console.log(this.state.programming)




            })
            .catch((error) => {
                console.log(error);

            });
    }

}

splitdata() {

    for (var i = 0; i < this.state.data.length; i++) {
        switch (this.state.data[i].major) {
            case "programming":
                this.state.programming.push(this.state.data[i])
                break;

            case "marketing":
                this.state.marketing.push(this.state.data[i])
                break;

            case "content":
                this.state.content.push(this.state.data[i])
                break;

            case "design":
                this.state.design.push(this.state.data[i])
                break;

            default:
                console.log("Switch Case Error")
        }
    }

    { this.sortData() }

}

sortData() {




    //ultimate sort  credit to : https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
    this.state.programming.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
    this.state.marketing.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
    this.state.content.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
    this.state.design.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });


    console.log(this.state.programming)
    console.log(this.state.marketing)
    console.log(this.state.content)
    console.log(this.state.design)






}


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {

    getSuggestions.call(this)

    this.setState({
      suggestions: getSuggestions(value)
      
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      id : "inputName",
      placeholder: 'Type a programming language',
      value,
      type: 'search',
      onChange: this.onChange
    };

    // Finally, render it!
    return (

        <div className="home2">

<div className="col-md-3" >

                </div>

                <div className="col-md-6" >

<center>
                <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

      </center>


                </div>

                <div className="col-md-3" >

                  

                </div>


      
      
      {/* <div className="form-group" >
                        <input type="text" className="form-control" id="seachName-Field" placeholder="Enter Your Name Here" name="searchName" />
                        
                    </div> */}

      </div>

      
    );
  }
}

export default Home2;