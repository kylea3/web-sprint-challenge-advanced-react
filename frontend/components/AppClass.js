import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialResponseMessage = ''

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  responseMessage: initialResponseMessage
}

export default class AppClass extends React.Component {
  constructor () {
    super();
    this.state = initialState;
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = 0;
    let y = 0;
    if(this.state.index <= 2) {
      y = 1
    } else if(this.state.index <= 5 && this.state.index > 2) {
      y = 2
    } else {
      y = 3
    }

    if(this.state.index === 0 || this.state.index === 3 || this.state.index === 6){
      x = 1
    } else if(this.state.index === 1 || this.state.index === 4 || this.state.index === 7) {
      x = 2
    } else {
      x = 3
    }
    return ([x, y])
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${this.getXY()[0]}, ${this.getXY()[1]})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) ) {
      return 0
    } else if (direction === 'right' && (this.state.index === 2 || this.state.index === 5 || this.state.index === 8) ) {
      return 0
    } else if (direction === 'up' && (this.state.index === 0 || this.state.index === 1 || this.state.index === 2) ) {
      return 0
    } else if (direction === 'down' && (this.state.index === 6 || this.state.index === 7 || this.state.index === 8) ) {
      return 0
    } else if(direction === 'left') {
      return -1
    } else if (direction === 'right') {
      return 1
    } else if (direction === 'up') {
      return -3
    } else if (direction === 'down') {
      return 3
    } else {
      return 0
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();
    
    this.setState({
      ...this.state,
      message: this.getNextIndex(evt.target.id) === 0 ? `You can't go ${evt.target.id}` : '',
      index: this.state.index + this.getNextIndex(evt.target.id),
      steps: this.getNextIndex(evt.target.id) === 0 ? this.state.steps : this.state.steps + 1
    })

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newPost = {
      'x': this.getXY()[0],
      'y': this.getXY()[1],
      'steps': this.state.steps,
      'email': this.state.email
    }
    axios.post('http://localhost:9000/api/result', newPost)
      .then(res => 
        this.setState({
          ...this.state,
          email: '',
          message: '',
          responseMessage: res.data.message
        })
        )
      .catch(err =>
        this.setState({
        ...this.state,
        responseMessage: err.response.data.message
      })
      )
      
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email" value={this.state.email}></input>
          <input onClick= {this.onSubmit} id="submit" type="submit"></input>
        <div>{this.state.responseMessage}</div>
        </form>
      </div>
    )
  }
}
