// SPDX-License-Identifier: GPL 3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DaiToken is Ownable, IERC20, ERC20 {

    string private constant c_name = "Mock DAI Token";
    string private constant c_symbol = "mDAI";
    uint256 private immutable i_totalSupply;

    // event Transfer(
    //     address indexed _from,
    //     address indexed _to,
    //     uint256 _value
    // );

    // event Approval(
    //     address indexed _owner,
    //     address indexed _spender,
    //     uint256 _value
    // );

    // mapping(address => uint256) public balanceOf;
    // mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialTokenSupply)
    ERC20(c_name, c_symbol) {
        i_totalSupply = _initialTokenSupply * 10 ** decimals();
        _mint(owner(), i_totalSupply);
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    // function transfer(address _to, uint256 _value) public returns (bool success) {
    //     require(balanceOf[msg.sender] >= _value);
    //     balanceOf[msg.sender] -= _value;
    //     balanceOf[_to] += _value;
    //     emit Transfer(msg.sender, _to, _value);
    //     return true;
    // }

    // function approve(address _spender, uint256 _value) public returns (bool success) {
    //     allowance[msg.sender][_spender] = _value;
    //     emit Approval(msg.sender, _spender, _value);
    //     return true;
    // }

    // function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    //     require(_value <= balanceOf[_from]);
    //     require(_value <= allowance[_from][msg.sender]);
    //     balanceOf[_from] -= _value;
    //     balanceOf[_to] += _value;
    //     allowance[_from][msg.sender] -= _value;
    //     emit Transfer(_from, _to, _value);
    //     return true;
    // }
}
