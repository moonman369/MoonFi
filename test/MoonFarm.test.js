const mDAI = artifacts.require("DaiToken");
const MNST = artifacts.require("MoonStakeToken");
const MoonFarm = artifacts.require("MoonFarm");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

contract("MoonFarm", (accounts) => {
  let mdai;

  before(async () => {
    mdai = await mDAI.deployed();
  });

  describe("Mock DAI deployment", () => {
    it("Contract should have desired name", async () => {
      expect(await mdai.name()).to.equal("Mock DAI Token");
    });
  });
});
