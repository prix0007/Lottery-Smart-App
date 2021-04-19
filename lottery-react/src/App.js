import React from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

function App() {

  const [appState, setAppState] = React.useState({
    manager: '',
    players: [],
    balance: 0,
    value: 0
  });

  const [message, setMessage] = React.useState('');

  const fetchContractDetails = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setAppState({
      ...appState,
      manager,
      players,
      balance
    })
  }

  React.useEffect(() => {
    fetchContractDetails();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting for transaction success ....');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(appState.value.toString(), 'ether')
    });

    setMessage('You have been entered 🎉');

  }

  const handlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Picking a winner ....');

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage('Wohoooo we have a winner  🎉');
  }

  return (
    <div className="App">
      <h1>Lottery Smart Contract</h1>
      <p>This contract is managed by {appState.manager}</p>
      <br />
      <p> There are currently {appState.players.length} players are competing to win {web3.utils.fromWei(appState.balance.toString(), 'ether')} amount of ether. 😆😆😆 </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input 
            value={appState.value}
            onChange={e => setAppState({...appState, value: e.target.value})}
          />
        </div>
        <button>
          Enter
        </button>
      </form>
      <hr />
        { <div>
          <h4>Ready to pick a winner?</h4>
          <button onClick={handlePickWinner}>
            Pick a winner
          </button>
        </div>}
      <hr />
      <h2>{message}</h2>
    </div>
  );
}

export default App;
