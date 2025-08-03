pragma solidity ^0.5.17;

import '../helpers/BaseStorage.sol';

contract UserStorage is BaseStorage {

    event UserCreated(string _message);

    struct Profile {
        uint userId;
        bytes32 username;
      }

    mapping(address => Profile) public profiles;
    mapping(address => bool) public addresses;
    mapping (bytes32 => uint) public usernames;
    mapping(bytes32 => bool) public usernameBool;

    uint latestUserId = 0;

    function createUser(
        address _address,
        bytes32 _username
        ) public onlyControllerAddr returns(uint) {

        latestUserId++;

        profiles[_address] = Profile(
        latestUserId,
        _username
        );

        addresses[_address] = true;
        usernameBool[_username] = true;
        usernames[_username] = latestUserId;

        emit UserCreated("Access Confirmed");
        return latestUserId;
    }

}