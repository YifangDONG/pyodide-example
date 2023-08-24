
import React from 'react';
import PyodideComponent from './PyodideComponent';
import PyodideWithPackage from './PyodideWithPackage';
// import { PyLoader } from './components/PyLoader';
// import { PyLoader2 } from './components/PyLoader2';

function App() {
  return (
    <div className="App">
      <PyodideComponent />
      <PyodideWithPackage />
      {/* <PyLoader className age={19} sexy={true} />
      <PyLoader2 name='xsd' age={true} sexy={true} /> */}
    </div>
  );
}

export default App;
