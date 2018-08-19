const HDWalletProvider = require("truffle-hdwallet-provider");
var mnenomic = "damp ethics similar silent reform cart bundle absorb luggage coral awesome choice";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 4,
      from: "0xc834eff8b3b5bb6dfa2e4469d4e0c415adf63bf9"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnenomic, "https://ropsten.infura.io/v3/abbe691d210c470bbb9e2956e2f82c49"),
      network_id: 3,
      gas: 3000000,
      gasPrice: 21
    }
  }
};
