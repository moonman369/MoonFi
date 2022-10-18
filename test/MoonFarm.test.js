const web3 = require("web3");

const mDAI = artifacts.require("DaiToken");
const MNST = artifacts.require("MoonStakeToken");
const MoonFarm = artifacts.require("MoonFarm");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const BN = web3.utils.toBN;

function tokens(n) {
  return n * 10 ** 18;
}

contract("MoonFarm", ([owner, investor]) => {
  const million = 1000000;
  let mdai, mnst, moonFarm;
  let mnstTotalSupply;

  before(async () => {
    // Load Contracts
    mdai = await mDAI.new(million);
    mnst = await MNST.new(million);
    moonFarm = await MoonFarm.new(mdai.address, mnst.address);
    mnstTotalSupply = await mnst.totalSupply();

    // Approve all Moon Stake tokens to farm (1 million)

    await mnst.approve(moonFarm.address, mnstTotalSupply);

    // Send tokens to investor
    await mdai.transfer(investor, web3.utils.toWei("100", "ether"), {
      from: owner,
    });
  });

  describe("Mock DAI deployment", async () => {
    it("MDAI contract should have desired name", async () => {
      expect(await mdai.name()).to.equal("Mock DAI Token");
    });
  });

  describe("MoonStake Token deployment", async () => {
    it("MNST contract should have desired name", async () => {
      expect(await mnst.name()).to.equal("MoonStake Token");
    });
  });

  describe("MoonFarm deployment", async () => {
    it("MoonFarm contract should have desired name", async () => {
      expect(await moonFarm.name()).to.equal("Moon Farm");
    });

    it("MoonFarm contract has full MoonStake token spend allowance", async () => {
      expect(await mnst.allowance(owner, moonFarm.address)).to.eql(
        mnstTotalSupply
      );
    });

    //     it("contract has tokens", async () => {
    //       let balance = await dappToken.balanceOf(tokenFarm.address);
    //       assert.equal(balance.toString(), tokens("1000000"));
    //     });
    //   });
  });
});
