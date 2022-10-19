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
  return web3.utils.toWei(n.toString(), "ether");
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

  describe("\nI. Mock DAI deployment", async () => {
    it("1. MDAI contract should have desired name", async () => {
      expect(await mdai.name()).to.equal("Mock DAI Token");
    });
  });

  describe("\nII. MoonStake Token deployment", async () => {
    it("1. MNST contract should have desired name", async () => {
      expect(await mnst.name()).to.equal("MoonStake Token");
    });
  });

  describe("\nIII. MoonFarm deployment", async () => {
    it("1. MoonFarm contract should have desired name", async () => {
      expect(await moonFarm.name()).to.equal("Moon Farm");
    });

    it("2. MoonFarm contract has full MoonStake token spend allowance", async () => {
      expect(await mnst.allowance(owner, moonFarm.address)).to.eql(
        mnstTotalSupply
      );
    });
  });

  describe("\nIV. Farming tokens", async () => {
    // beforeEach(async () => {});

    it("1. Investor should have correct amount of funds before staking", async () => {
      expect((await mdai.balanceOf(investor)).toString()).to.equal(
        web3.utils.toWei("100", "ether")
      );
    });

    it("2. The staked amount should be deducted from the investor account and added to MoonFarm contract", async () => {
      const initInvestorBalance = await mdai.balanceOf(investor);
      const initFarmBalance = await mdai.balanceOf(moonFarm.address);
      const stakeAmount = 80;
      await mdai.approve(moonFarm.address, tokens(stakeAmount), {
        from: investor,
      });
      await expect(moonFarm.stake(tokens(stakeAmount), { from: investor })).to
        .eventually.be.fulfilled;

      expect((await mdai.balanceOf(investor)).toString()).to.equal(
        BN(initInvestorBalance)
          .sub(BN(tokens(stakeAmount)))
          .toString()
      );
      expect((await mdai.balanceOf(moonFarm.address)).toString()).to.equal(
        BN(initFarmBalance)
          .add(BN(tokens(stakeAmount)))
          .toString()
      );

      expect(await moonFarm.s_hasStaked(investor)).to.equal(true);

      expect(await moonFarm.s_isStaking(investor)).to.equal(true);

      expect((await moonFarm.s_stakingBalances(investor)).toString()).to.equal(
        tokens(stakeAmount)
      );
    });

    it("3. Users should not be able to stake less than 0.01 mDAI", async () => {
      await expect(
        moonFarm.stake(tokens("0.009"))
      ).to.eventually.be.rejectedWith(
        "MoonFarm: Minimum staking amount is 0.01 mDAI"
      );
    });

    it("4. All the users are issued MNST tokens equal to the amount of mDAI tokens they have staked", async () => {
      await expect(moonFarm.issueTokens({ from: owner })).to.eventually.be
        .fulfilled;
      expect(await mnst.balanceOf(investor)).to.eql(
        await moonFarm.s_stakingBalances(investor)
      );
    });
  });
});
