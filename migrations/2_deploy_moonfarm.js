const MoonFarm = artifacts.require("MoonFarm");

module.exports = function(deployer) {
  deployer.deploy(MoonFarm);
};
