pragma solidity ^0.5.17;

import "../../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";


contract BaseStorage is Ownable {

    address public controllerAddr;

    modifier onlyControllerAddr() {
        require(msg.sender == controllerAddr,
        "Only Controller Can Create A User");
      _;
  }
    function setControllerAddr(address _controllerAddr) public onlyOwner {
        controllerAddr = _controllerAddr;
    }

} 