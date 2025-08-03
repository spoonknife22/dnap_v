pragma solidity ^0.5.17;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import "./ProposalStorage.sol";
import "../../node_modules/@openzeppelin/contracts/lifecycle/Pausable.sol";

contract ProposalController is BaseController, Pausable {

  event AssetNomination(string _message, address _proposalAddress);
  address proposalAddress;
  address public _marketAddr;
  address public _tokenAddress;
  
  ContractManager _manager = ContractManager(managerAddr); 

  address[] public deployedAddresses;   

  struct Proposals {
    uint128 propStatus;
    uint256 tokenId;
    bytes32 orderId;
  }

  mapping(address => Proposals) public propData;
  mapping(uint256 => bool) public deployedProposals;
  mapping(uint256 => address) public proposalTokenIdMap; 
  
constructor() public {_marketAddr = 0xB2799e42d75AE8E0CbC1103d47b7d84517355326; _tokenAddress = 0xfb74efe49b81Bc37B5F3bf77e16eE18238fEe895;}
                                                                                                                                     
  function createProposal(bytes32 _orderId, uint128  _userId, uint256 _expiresAt, uint256 _listPrice, uint256 _reSalePrice, uint256 _tokenId, address _nftaddress) external {
    uint256 timeMilli = block.timestamp * 1000;
    require(_expiresAt > timeMilli,
    "Asset Sale Has Expired.");  
    require(!deployedProposals[_tokenId]);
    deployedProposals[_tokenId] = true;
    ProposalStorage proposal = new ProposalStorage(_orderId, _userId, _expiresAt, _listPrice, _reSalePrice, _tokenId, _marketAddr, _tokenAddress, _nftaddress);
    proposalAddress = address(proposal);
    //deployedProposalsArray.push(_tokenId);
    deployedAddresses.push(proposalAddress);
    proposalTokenIdMap[_tokenId]=proposalAddress;
    Proposals storage proposals = propData[proposalAddress];
    proposals.propStatus = 0;
    proposals.tokenId = _tokenId;
    proposals.orderId = _orderId;
    emit AssetNomination("Asset Successfully Nominated", proposalAddress);
  }
 
  function getDeployedAddresses() public view returns (address[] memory) {
      return deployedAddresses;
  }

 function getPropTokenIdMap(uint256 _tokenId) public view returns (address) {
      return proposalTokenIdMap[_tokenId];
  }

 function updatePropData(address _proposalAddress, uint128 _status, bytes32 _orderId) public returns (bool){
    Proposals storage proposals = propData[_proposalAddress];
    proposals.orderId = _orderId;
    proposals.propStatus = _status;
    return true;
 }

 function getPropData(address _proposalAddress) public view returns(uint128, uint256, bytes32) {
  uint128 currentStatus = propData[_proposalAddress].propStatus;
  uint256 currentTokenId = propData[_proposalAddress].tokenId;
  bytes32 currentOrderId = propData[_proposalAddress].orderId;
  return (currentStatus, currentTokenId, currentOrderId);
}


}














