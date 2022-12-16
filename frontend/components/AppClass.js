import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
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
    return `Coordinates (${x}, ${y})`;
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newIndex = {...this.state}
    if(direction === 'left' && newIndex.index === 0 || newIndex.index === 3 || newIndex.index === 6 ) {
      return newIndex.index
    } else if (direction === 'right' && newIndex.index === 2 || newIndex.index === 5 || newIndex.index === 8 ) {
      return newIndex.index
    } else if (direction === 'up' && newIndex.index === 0 || newIndex.index === 1 || newIndex.index === 2 ) {
      return newIndex.index
    } else if (direction === 'down' && newIndex.index === 6 || newIndex.index === 7 || newIndex.index === 8 ) {
      return newIndex.index
    } else if(direction === 'left') {
      newIndex.index = newIndex.index - 1;
    } else if (direction === 'right') {
      newIndex.index = newIndex.index + 1
    } else if (direction === 'up') {
      newIndex.index = newIndex.index - 3
    } else if (direction === 'down') {
      newIndex.index = newIndex.index + 3
    }

    return newIndex.index;
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();
    this.setState({
      ...this.state,
      index: this.getNextIndex(evt.target.id),
      steps: this.state.steps + 1
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
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
