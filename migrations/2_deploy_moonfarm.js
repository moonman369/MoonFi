const web3 = require("web3");

const mDAI = artifacts.require("DaiToken");
const MNST = artifacts.require("MoonStakeToken");
const MoonFarm = artifacts.require("MoonFarm");
const million = 10 ** 6;

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(mDAI, million);
  const mdai = await mDAI.deployed();

  await deployer.deploy(MNST, million);
  const mnst = await MNST.deployed();

  await deployer.deploy(MoonFarm, mdai.address, mnst.address);
  const moonFarm = await MoonFarm.deployed();

  await mnst.approve(moonFarm.address, web3.utils.toWei("1000000", "ether"));
  await mdai.transfer(accounts[1], web3.utils.toWei("100", "ether"));
};
