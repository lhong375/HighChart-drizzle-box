import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'
import Ballot from './../build/contracts/Ballot.json'
//import Attribution from './../build/contracts/Attribution.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    //ComplexStorage,
    SimpleStorage,
    //TutorialToken,
    Ballot,
    //Attribution
  ],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 30000
  }
}

export default drizzleOptions