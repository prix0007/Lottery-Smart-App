const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.WALLET_MNEUMONICS, // Your wallet mnuemonics here
  process.env.INFURA_KEY // 'https://rinkeby.infura.io/v3/YOUR_INFURA_API_KEY'
)


const web3 = new Web3(provider);

const deploy = async () => {
    // Get a list of all accounts
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(abi).deploy({
      data: "0x" + evm.bytecode.object
    }).send({
      from: accounts[0],
      gas: '1000000'
    })

    console.log('Contract deployed to ', result.options.address);
   
};

deploy();