- the big picture
  - what we will build in this course ?
    - a fully decentralize voting app which :
      - smart contract is deployed to ethereum test network : ropsten, rinkeby
      - webui is deployed to distributed file system called : ipfs
    - why voting app is perfect to demo decentralize app ?
      - ethereum blockchain make sure that no one could change data after it is made
      - we do not want any people could change vote result once it is made
      - and we do not want any people change the logic behind back end

  - structure of decentralize application:
    - dapp like other web application, it contains:
      - webui
      - html layout : be updated dynamically by App.js javascript code
      - App.js will communicate with blockchain and get back data when ever transaction happen
      - backend is not any web server but is smart contract which is deployed to blockchain

- installation
  - install node --> https://nodejs.org/en/
  - install truffle framewrok --> https://truffleframework.com/truffle
  - install ganache --> https://truffleframework.com/ganache
  - install metamask --> https://metamask.io/
  - install visual studio code --> https://code.visualstudio.com/
  - install plugin for coding with solidity
  - install live server
  - install terminal

- start project
  - truffle doc --> https://truffleframework.com/docs
  - create a empty folder --> mkdir C:\election
  - truffle prepare for us some template to speed up development process
  - we will use pet-shop template --> truffle unbox pet-shop
  - explain about what petshop have
    - src : contain webui code html,css,js
    - contracts and migrations folder
    - test folder
    - truffle.js file contain blockchain information for deploy smart contract
  - if you on windows --> create truffle-config.js then copy 
    all content from truffle.js, then delete truffle.js file
  - if you on mac --> just use truffle.js file
  - this file describe how we will connect to blockchain
  - start ganache
  - create new contract name Election.sol
    with very simple content

    contract Election {
      string public candidate;
      constructor() public {
        candidate = "candidate 1";
      }
    }

  - create a new migration file call 2_deploy_election.js
  - deploy start contract to local blockchain -->  truffle migrate
  - try to interact with smart contract
      --> truffle console
      --> Election.deployed().then(function(i){instance=i})
      --> instance.candidate()

- smart contract coding
  - design contract component

    - data for contract
      - need a struct to model a candidate
      - need to manage multiple candidates
      - need to manage multiple voters and state of vote

    - function for contract
      - add candidate function
      - constructor function
      - vote function

    - event for communicate between contract and webui


  - coding contract and deploy to local blockchain
     document about default value
     	http://solidity.readthedocs.io/en/develop/control-structures.html#default-value


- interact with smart contract from truffle console
  - get contract instance --> Election.deployed().then(function(i){instance=i})
  - show contract address --> instance.address
  - get candidate count --> instance.candidatesCount().then(function(count){vcount=count})
  - get candidate name --> instance.candidates(1).then(function(candidate){name=candidate[1]})
  - do vote using account 0 --> instance.vote(1, {from:web3.eth.accounts[0]})
  - get voter state --> instance.voters(web3.eth.accounts[0])    
  - get vote count --> instance.candidates(1).then(function(candidate){voteCount=candidate[2]})
  - vote with other voter --> instance.vote(1, {from:web3.eth.accounts[2]})
  - event --> instance.vote(1, {from:web3.eth.accounts[8]}).then(function(result){console.log(result.logs[0].args._candidateId)})

- automation test smart contract
  - why automation test with dapp is very important ?
  - contract test structure
   - check init number of candidate  * 
      - check init value for each candidate
       - check vote function
        - check require candidate id condition for vote function
      - check require voter not yet vote condition
      - check voters change after vote
      - check vote count after vote
      - check event happen

  - write automation test


- html layout
  - header
  - table
  - select from
  - account information


- js app to communicate with smart contract
  - init web3js
  - init contract
  - init render
    - candidates information
    - candidates selection
  - vote function
  - hide vote form when user already vote
  - event binding so app auto refresh after vote


- deploy to rinkeby network with geth node
  - download geth clien from --> https://geth.ethereum.org/downloads/
  - install geth and binary will go to --> C:\Program Files\Geth
  - start node and syncing use rinkeby network ---> geth --rinkeby  
  - attach to console javascript ---> geth attach ipc:\\.\pipe\geth.ipc
  - check syncing status (need to wait until all sync complete) --> eth.syncing (should return false)

  - create new account --> personal.newAccount()
  - list account --> eth.accounts
  - get some free eth from faucet --> https://faucet.rinkeby.io/
  - check account balance with console --> eth.getBalance(your account address)
  - check account balance and convert to ether --> web3.fromWei(your account address,"ether")

  - start geth again with command --> geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal
  - add define for rinkeby network config to truffle-config.js
    rinkeby: {
        host: "127.0.0.1",
        port: 8545,
        network_id: 4, 
        from: "your account address"
      }
  - unlock account before deploy to test network --> personal.unlockAccount(your account address)
  - deploy to rinkeby network after unlock accont ----> truffle migrate --reset --network rinkeby

  - switch to rinkeby network on metamask
  - improt rinkeby account to metamask ----> C:\Users\TAN\AppData\Roaming\Ethereum\rinkeby\keystore
  - scan information after deploy and do vote ----> https://rinkeby.etherscan.io

  - register user on infura --> https://infura.io
  - go to dashboard and copy the api url with key and use in App.js
  - change app.js to use infura host

- deploy to testnet with hdwallet and infura
  - truffle hdwallet link --> https://github.com/trufflesuite/truffle-hdwallet-provider
  - install windows build tool --> npm install --production windows-build-tools
  - install hdwallet --> npm install truffle-hdwallet-provider
  - get 12 words for mnenomic from ---> https://iancoleman.io/bip39/
  - create test_hdwallet.js to show up address from mnenomic

  - modify app.js to use truffle hdwallet provider

    ropsten: {
      provider: () => new HDWalletProvider(mnenomic, "https://ropsten.infura.io/v3/abbe691d210c470bbb9e2956e2f82c49"),
      network_id: 3,
      gas: 3000000,
      gasPrice: 21
    },

    get some free ether from ropsten faucet -->https://faucet.ropsten.be/

  - deploy to ropsten network --> truffle migrate --reset --network ropsten
  - modify app.js to use ropsten infura url api
  - use metamask to restore account from seed phrase



- working with ipfs

  - install ipfs --> https://dist.ipfs.io/#go-ipfs
  - init a ipfs node --> ipfs init
  - run as long service --> ipfs daemon 
  - check the peer --> ipfs swarm peers

  - add all dist folder --> ipfs add -r dist/  
  - publish the hash--> ipfs name publish "hash of dist"
  - access dapp from internet --> gateway.ipfs.io/ipfs/"hash of dist"
  
- some other good read
  - https://hackernoon.com/wtf-is-ethereum-c65e0d67ac09
  - https://hackernoon.com/wtf-is-the-blockchain-1da89ba19348
