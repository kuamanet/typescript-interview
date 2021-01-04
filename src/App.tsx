import React from 'react';
import logo from './logo.svg';
import './App.scss';

const teams:Array<string> = [
    "Italy",
    "Brasil",
    "Portugal",
    "France",
    "Germany",
    "Russia",
    "Argentina",
    "Uruguay",
    "Croatia",

]

function App() {
  return (
    <div>
      <ul>
          {teams.map((it, index) => (<li key={index}>{it}</li>))}
      </ul>
    </div>
  );
}

export default App;
