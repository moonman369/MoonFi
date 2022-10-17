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

  await mdai.transfer(accounts[1], String(100 * 10 ** 18));
};
