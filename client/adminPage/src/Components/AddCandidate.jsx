import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class AddCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateName : '', //50
            electionDate  : '', //date
            adURL         : '', //50
            blurb         : '' //1000
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    //TODO set max input length and display remaining characters

    handleChange(date) {
        this.setState({
          electionDate: date
        });
    }

    handleInput (e) {
        let property = e.target.id;
        this.setState({
            [property]: e.target.value
        })
    }

    handleAdd(e) {
        e.preventDefault()
        if (this.state.name === '') {
            window.alert('You need to add the candidate\'s name');
            return;
        }
        if (this.state.electionDate === '') {
            window.alert('Select their election date');
            return;
        }
        if (this.state.blurb === '') {
            window.alert('Don\'t forget to write a description');
            return;
        }
        if (this.state.adURL === '') {
            window.alert('Include the embed link for their ad or a picture');
            return;
        }

        axios
            .post('/api/candidate', {
                name         : this.state.candidateName,
                electionDate : this.state.electionDate,
                adURL        : this.state.adURL,
                blurb        : this.state.blurb
            })
            .then(data => console.log(data))
    }

    render () {
        return (
            <div>
                Add Candidate Information
                <form>
                    Name: <input type='text' onChange={this.handleInput} id='candidateName' ></input>
                    <br />
                    Blurb: <input type='text' onChange={this.handleInput} id='blurb' ></input>
                    <br />
                    Advertisement URL: <input type='text' onChange={this.handleInput} id='adURL' ></input>
                    <br />
                    Election Date: 
                    <DatePicker
                        selected={this.state.electionDate}
                        onChange={this.handleChange}
                    />
                    <br />
                    <button onClick={this.handleAdd}>Add Candidate</button>
                </form>
            </div>
        )
    }
}