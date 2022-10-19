// // SPDX-License-Identifier: GPL3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoonFarm is Ownable {
    
    string private constant c_name = "Moon Farm";
    ERC20 private mdai;
    ERC20 private mnst;

    mapping(address => uint256) public s_stakingBalances;
    mapping(address => bool) public s_hasStaked;
    mapping(address => bool) public s_isStaking;
    address[] public s_stakers;
    


    constructor (address _mdai, address _mnst) {
        mdai = ERC20(_mdai);
        mnst = ERC20(_mnst);
    }

    function name() public pure returns (string memory) {
        return c_name;
    }

    // Staking tokens
    function stake(uint256 _amount) public {
        require(_amount > 10 ** (mdai.decimals() - 2), "MoonFarm: Minimum staking amount is 0.01 mDAI");
        mdai.transferFrom(msg.sender, address(this), _amount);
        s_stakingBalances[msg.sender] += _amount;

        if (!s_isStaking[msg.sender]) {
            s_isStaking[msg.sender] = true;
            s_stakers.push(msg.sender);
        }

        s_hasStaked[msg.sender] = true;
    }

    function issueTokens() public onlyOwner {
        for (uint256 i = 0; i < s_stakers.length; i++) {
            address recipient = s_stakers[i];
            uint256 balance = s_stakingBalances[recipient];
            if (balance > 0) {
                mnst.transferFrom(owner(), recipient, balance);
            }
        }
    }

}