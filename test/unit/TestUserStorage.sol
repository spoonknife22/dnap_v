pragma solidity ^0.6.4;

//import "truffle/Assert.sol";
import "../../../../AppData/Roaming/npm/node_modules/truffle/build/Assert.sol";
import "../../contracts/users/UserStorage.sol";

contract TestUserStorage {
  UserStorage userStorage;
  address myAddress;

  constructor() public {
    userStorage = new UserStorage();
    userStorage.setControllerAddr(address(this));
    myAddress = address(this);
  }





 function testCreateFirstUser() public {
    uint _expectedId = 1;

    Assert.equal(userStorage.createUser(
      address(0),
      "isaiah"
    ), _expectedId, "Should create user with ID 1");
  }

}