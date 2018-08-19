const HDWalletProvider = require("truffle-hdwallet-provider");

var mnenomic = "damp ethics similar silent reform cart bundle absorb luggage coral awesome choice";

var wl = new HDWalletProvider(mnenomic, "https://ropsten.infura.io/v3/abbe691d210c470bbb9e2956e2f82c49");

console.log(wl.addresses);