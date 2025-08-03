pragma solidity ^0.5.17;

import "../../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract BaseController is Ownable {

  // The Contract Manager's address
  address managerAddr;

  function setManagerAddr(address _managerAddr) public onlyOwner {
    managerAddr = _managerAddr;
  }

}