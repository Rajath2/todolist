import React from 'react';
import Todos from './components/Todo';

class App extends React.Component {
  render(){
  return (
    <div className="container">
      <h1 className='text-center'>Todo App</h1>
      <Todos/> 
    </div>
  );
  } 
}

export default App;
