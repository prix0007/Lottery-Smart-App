const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const source = fs.readFileSync(lotteryPath, 'utf-8');

let complierInput = {
  language: 'Solidity',
  sources:
  {
      'Lottery.sol': 
      {
          content: source
      }
  },
  settings:
  {
      optimizer:
      {
          enabled: true
      },
      outputSelection:
      {
          '*':{
              '*':['*']
          }
      }
  }
};
console.log('Compiling Contract');
let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
console.log('Contract Compiled');
// console.log(Object.keys(compiledContract.contracts['Lottery.sol']['Lottery']))
// console.log(Object.keys(compiledContract.contracts['Lottery.sol']['Lottery'].evm.deployedBytecode))
for (let contractName in compiledContract.contracts['Lottery.sol']) {
  // console.log(contractName , compiledContract.contracts['Lottery.sol'][contractName].abi);      
  let abi = compiledContract.contracts['Lottery.sol'][contractName].abi;
  const outputPath = path.resolve(__dirname, 'contracts/bin', `${contractName}_abi.json`);
  fs.writeFileSync(outputPath, JSON.stringify(abi));
}

// console.log(Object.keys(compiledContract.contracts['Lottery.sol']['Lottery']))
module.exports = compiledContract.contracts['Lottery.sol']['Lottery']