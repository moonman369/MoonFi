require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    ganache_local: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: "^0.8.0",
      evmVersion: "petersburg",
    },
  },
};
