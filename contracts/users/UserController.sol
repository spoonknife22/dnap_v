pragma solidity ^0.5.17;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import './UserStorage.sol';

contract UserController is BaseController {

  function createUser(bytes32 _username) public returns(uint) {
    ContractManager _manager = ContractManager(managerAddr);
    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _storage = UserStorage(_userStorageAddr);


    require(!_storage.addresses(msg.sender),
    "Address In Use");

    require(_storage.usernames(_username) == 0,
    "UserName In Use");

    return _storage.createUser(
      msg.sender,
      _username
    );
  }

}