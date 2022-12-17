import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = '';
const initialEmail =  '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialResponseMessage = '';

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
 const [state, setState] = useState({
  message: initialMessage,
  email:  initialEmail,
  steps: initialSteps,
  index: initialIndex, // the index the "B" is at
  responseMessage: initialResponseMessage
})

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = 0;
    let y = 0;
    if(state.index <= 2) {
      y = 1
    } else if(state.index <= 5 && state.index > 2) {
      y = 2
    } else {
      y = 3
    }

    if(state.index === 0 || state.index === 3 || state.index === 6){
      x = 1
    } else if(state.index === 1 || state.index === 4 || state.index === 7) {
      x = 2
    } else {
      x = 3
    }
    return ([x, y])
  }


  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${getXY()[0]}, ${getXY()[1]})`
  }
  

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({
      ...state,
      email: initialEmail,
      message: initialMessage,
      steps: initialSteps,
      index: initialIndex,
      responseMessage: initialResponseMessage
    });
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && (state.index === 0 || state.index === 3 || state.index === 6) ) {
      return 0
    } else if (direction === 'right' && (state.index === 2 || state.index === 5 || state.index === 8) ) {
      return 0
    } else if (direction === 'up' && (state.index === 0 || state.index === 1 || state.index === 2) ) {
      return 0
    } else if (direction === 'down' && (state.index === 6 || state.index === 7 || state.index === 8) ) {
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

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();
    
    setState({
      ...state,
      message: getNextIndex(evt.target.id) === 0 ? `You can't go ${evt.target.id}` : '',
      index: state.index + getNextIndex(evt.target.id),
      steps: getNextIndex(evt.target.id) === 0 ? state.steps : state.steps + 1
    })
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setState({
      ...state,
      email: evt.target.value
  })
}

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newPost = {
      'x': getXY()[0],
      'y': getXY()[1],
      'steps': state.steps,
      'email': state.email
    }
    axios.post('http://localhost:9000/api/result', newPost)
      .then(res => 
        setState({
          ...state,
          responseMessage: res.data.message
        })
        )
      .catch(err =>
        setState({
        ...state,
        responseMessage: err.response.data.message
      })
      )
      
    setState({
      ...state,
      email: initialEmail,
      message: initialMessage,
      steps: initialSteps,
      index: initialIndex,
      responseMessage: initialResponseMessage
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{state.steps === 1 ? `You moved ${state.steps} time` : `You moved ${state.steps} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="type email" value={state.email}></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
        <div>{state.responseMessage}</div>
      </form>
    </div>
  )
}
