const mDAI = artifacts.require("DaiToken");
const MNST = artifacts.require("MoonStakeToken");
const MoonFarm = artifacts.require("MoonFarm");

module.exports = async (deployer) => {
  await deployer.deploy(mDAI);
  const mdai = await mDAI.deployed();

  await deployer.deploy(MNST);
  const mnst = await MNST.deployed();

  await deployer.deploy(MoonFarm, mdai.address, mnst.address);
  const moonFarm = await MoonFarm.deployed();
};
