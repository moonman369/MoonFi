// // SPDX-License-Identifier: GPL3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MoonFarm {
    
    string private constant name = "Moon Farm";
    IERC20 private mdai;
    IERC20 private mnst;

    constructor (address _mdai, address _mnst) {
        mdai = IERC20(_mdai);
        mnst = IERC20(_mnst);
    }
}