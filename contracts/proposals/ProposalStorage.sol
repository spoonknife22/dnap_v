pragma solidity ^0.5.17;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "../../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../../Div.sol";
//import "../helpers/provableAPI.sol";


interface MarketPlaceInterface {
    function executeOrder(address nftAddress, uint assetId, uint price) external;
    function createOrder(address nftAddress, uint256 assetId, uint256 priceInWei, uint256 expiresAt) external;
}

interface IERC721 {
    function approve(address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
}

interface IERC20 {
    function approve(address spender, uint256 value) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address who) external view returns (uint256);
}

interface Controller {
    function updatePropData(address _propAddress,uint128 _propStatus, bytes32 _orderId) external;
}

//contract ProposalStorage is ERC721Holder, usingProvable {
contract ProposalStorage is ERC721Holder {
   using SafeMath for uint256;
   Controller public controller;
    
  enum ProposalStatus { FUNDING, FUNDED, WITHDRAWING, PURCHASED, FOR_SALE, SOLD, PAYINGOUT, PAIDOUT, EXPIRED, SALE_FAILED, SECOND_SALE, AWARDED }
  ProposalStatus constant defaultChoice = ProposalStatus.FUNDING;  
  uint256 constant NUM_RANDOM_BYTES_REQUESTED = 7;
  
  IERC721 nftContract;
  IERC20 acceptedToken;
  MarketPlaceInterface market;

  address public winningContributor;  
  uint256 public randomNumber;
  uint256 public reSaleExpiresAt;
  
  address public owner;
  address public nftAddress;
  address public tokenAddress;
  address public marketAddr;
  uint256 public tokenId;


  event ContributionSuccess(string _message, uint256 _contribution, uint256 currentContractBalance);  
  event ProposalEvent(string _message);
  event LogNewProvableQuery(string description);
  event RandomFailure(string _message);

  mapping (uint256 => Proposal) public proposals;

  struct Proposal {
      bytes32 orderId;
      uint128 userId;
      uint256 expiresAt;
      uint256 listPrice;
      uint256 reSalePrice;
      uint256 tokenId;
      uint256 postedAt;
      uint256 balance;
      uint256 remainder;
      bool fundingComplete;
      ProposalStatus status;
      mapping(address => bool) contributors;
  } 

  address[] weightedDepositers;
  
  mapping(address => uint256) public deposits;

  address[] public depositersArray;

  constructor(bytes32 _orderId, uint128 _userId, uint256 _expiresAt, uint256 _listPrice, uint256 _reSalePrice, uint256 _tokenId, address  _marketAddr, address _tokenAddress, address _nftaddress) public {
    //provable_setProof(proofType_Ledger);

   controller = Controller(msg.sender); 
   proposals[_tokenId] = Proposal({
      orderId: _orderId,
      userId: _userId,
      postedAt: now,
      expiresAt: _expiresAt,
      listPrice: _listPrice,
      reSalePrice: _reSalePrice,
      tokenId: _tokenId,
      balance: 0,
      remainder: _listPrice,
      fundingComplete: false,
      status: ProposalStatus.FUNDING
    }); 
      owner = msg.sender;
      tokenId = _tokenId;   
      nftAddress = _nftaddress;
      marketAddr = _marketAddr;
      tokenAddress = _tokenAddress; 
      nftContract = IERC721(_nftaddress);
      acceptedToken =  IERC20(_tokenAddress);
      market = MarketPlaceInterface(_marketAddr);
  }


modifier onlyBuyer()  {
  _onlyDepositer();
  _;
}

function _onlyDepositer() internal view {
  Proposal storage proposal = proposals[tokenId];
  require(
     proposal.contributors[msg.sender] == true, "Must have funds deposited.");
}

modifier notWithdrawing()  {
 _notWithDrawing();
  _;
}

function _notWithDrawing() internal view {
  Proposal storage proposal = proposals[tokenId];
  require(proposal.status != ProposalStatus.WITHDRAWING, "Withdrawal is proccessing.");
}

modifier funding()  {
 _propFunding();
  _;
}

function _propFunding() internal view {
  Proposal storage proposal = proposals[tokenId];
  require(proposal.status == ProposalStatus.FUNDING, "Asset is funding.");
}

modifier notExpired()  {
  _propNotExpired();
  _;
}


uint256 saleShareAmount = 0;
uint256 ownerCutPerMillion = 100000;

function _propNotExpired() internal view {
  Proposal storage proposal = proposals[tokenId];
  uint256 timeMilli = block.timestamp * 1000;
  require (proposal.expiresAt > timeMilli,
  "Asset sale has expired.");
}

function deposit(uint _contribution) public notExpired returns(bool) {
    Proposal storage proposal = proposals[tokenId];
    require(_contribution <= proposal.remainder,
    "Greater than needed.");
    require(acceptedToken.transferFrom(msg.sender,address(this), _contribution),
    "Transfer of tokens failed");
    deposits[msg.sender] += _contribution;
    proposal.balance += _contribution;
    proposal.remainder = proposal.listPrice - proposal.balance;
    bool alreadyAdded = false;
    for(uint i = 0; i < depositersArray.length; i++) {
      if(depositersArray[i] == msg.sender) {
        alreadyAdded = true;
      }
    }
    if(alreadyAdded == false) {
      depositersArray.push(msg.sender);
    }
    require(proposal.balance == acceptedToken.balanceOf(address(this)),
    "Balance not equal to ERC20 balance");
    proposal.contributors[msg.sender] = true;
    if(proposal.listPrice == proposal.balance){
       proposal.fundingComplete = true;
       proposal.status = ProposalStatus.FUNDED;
       controller.updatePropData(address(this), 1, proposal.orderId);
       completePurchase();
       emit ContributionSuccess("Funding Complete!", _contribution,  proposal.balance);
       return true;
    }
    else {
      emit ContributionSuccess("Contribution accepted!", _contribution,  proposal.balance);
      return true;
    }
}
    
function completePurchase() public onlyBuyer notWithdrawing notExpired {
  Proposal storage proposal = proposals[tokenId];
  require(acceptedToken.approve(marketAddr, proposal.listPrice),
  "Token approval failed");
  market.executeOrder(nftAddress, tokenId, proposal.listPrice);
  proposal.status = ProposalStatus.PURCHASED;
  proposal.balance = 0;
  controller.updatePropData(address(this), 3, proposal.orderId);
  sellAsset();
  emit ProposalEvent("Asset Purchase complete!");
}

function sellAsset() public onlyBuyer {
  Proposal storage proposal = proposals[tokenId];
  uint256 timeMilli = block.timestamp * 1000;
  require(proposal.status == ProposalStatus.PURCHASED,
  "Asset has not been purchased");
  //Second Sale Attempt
  if(proposal.status == ProposalStatus.FOR_SALE){
    uint256 expireYear = now + (365 * 1 days); 
    reSaleExpiresAt = expireYear * 1000;
    uint256 newPrice = proposal.listPrice;
    market.createOrder(nftAddress, tokenId, newPrice, reSaleExpiresAt);
    controller.updatePropData(address(this), 10, proposal.orderId);
    proposal.status = ProposalStatus.SECOND_SALE;
    emit ProposalEvent("Asset has been placed on sale again!");
  }
  else{
    nftContract.approve(marketAddr,tokenId);
    uint256 newPrice = proposal.reSalePrice;
    uint256 expireYear = now + (365 * 1 days); 
    reSaleExpiresAt = expireYear * 1000;
    market.createOrder(nftAddress, tokenId, newPrice, reSaleExpiresAt);
    controller.updatePropData(address(this), 4, proposal.orderId);
    proposal.status = ProposalStatus.FOR_SALE;
    emit ProposalEvent("Asset has been placed on sale!");
  }
 }
 
function payOut() external onlyBuyer {
  Proposal storage proposal = proposals[tokenId];
  controller.updatePropData(address(this), 5, proposal.orderId);
  proposal.status = ProposalStatus.PAYINGOUT;
  for(uint16 i = 0; i < depositersArray.length; i++) {
    address _depositer = depositersArray[i];
    uint256 depositedAmount = deposits[_depositer];
    uint256 totalAmount = acceptedToken.balanceOf(address(this));
    if (ownerCutPerMillion > 0) {
      // Calculate sale share
      saleShareAmount = totalAmount.mul(ownerCutPerMillion).div(1000000);
      // Transfer share amount for marketplace Owner
      require(
        acceptedToken.transfer(owner, saleShareAmount),
        "Transfering the cut to the Marketplace owner failed"
      );
    }
    uint256 payOutTotal = totalAmount - saleShareAmount;
    uint256 percentage = Div.mulDiv(depositedAmount,100, proposal.listPrice);
    uint256 userSaleShare = Div.mulDiv(percentage,payOutTotal,100);
    require (
      acceptedToken.transfer(_depositer, userSaleShare),
      "Transfering the sale amount to the sellers failed"
    );
    proposal.contributors[_depositer] = false;
    proposal.balance = acceptedToken.balanceOf(address(this));
    deposits[_depositer] = 0;
    controller.updatePropData(address(this), 7, proposal.orderId);
    proposal.status = ProposalStatus.PAIDOUT;
  }
   emit ProposalEvent("Payout is complete!");
}

function withdraw() external onlyBuyer notWithdrawing returns(bool){
  Proposal storage proposal = proposals[tokenId];
  uint256 timeMilli = block.timestamp * 1000;
  require(proposal.status == ProposalStatus.FUNDING || timeMilli > proposal.expiresAt, "Withdrawal failed.");
  proposal.status = ProposalStatus.WITHDRAWING;
  uint256 depositedAmount = deposits[msg.sender];
  deposits[msg.sender] = 0;
  proposal.contributors[msg.sender] = false;
  proposal.balance -= depositedAmount;
  proposal.remainder = proposal.listPrice - proposal.balance;
  acceptedToken.transfer(msg.sender, depositedAmount);
  emit ProposalEvent("Withdrawal complete!");
  if(timeMilli > proposal.expiresAt) {
    proposal.status = ProposalStatus.EXPIRED;
  }
  else{
    proposal.status = ProposalStatus.FUNDING;
  }
  return true;
}   

function updateContract(uint256 _newPrice, uint256 _expiresAt, bytes32 _orderId) external funding returns(bool){
    Proposal storage proposal = proposals[tokenId];
    if(proposal.listPrice != _newPrice || proposal.expiresAt != _expiresAt || proposal.orderId != _orderId){
      proposal.orderId = _orderId;
      proposal.expiresAt = _expiresAt;
      proposal.listPrice = _newPrice;
      proposal.remainder = proposal.listPrice - proposal.balance;
      controller.updatePropData(address(this), 0, _orderId);
      emit ProposalEvent("Contract updated.");
      return true;
    }
    else{
       emit ProposalEvent("Error! No update needed.");
        return false;
    }
}

function weightContributors() onlyBuyer public {
      Proposal storage proposal = proposals[tokenId];
      uint256 timeMilli = block.timestamp * 1000;
      require(timeMilli > reSaleExpiresAt && proposal.status == ProposalStatus.SECOND_SALE,
      "Asset resale not expired.");
      controller.updatePropData(address(this), 8, proposal.orderId);
      for(uint16 i = 0; i < depositersArray.length; i++) {
        address _depositer = depositersArray[i];
        uint256 depositedAmount = deposits[_depositer];
        uint256 reducedAmount = Div.mulDiv(depositedAmount, 1, 100000000000000000000);
        for(uint256 j = 0; j < reducedAmount; j++) {
          weightedDepositers.push(_depositer);
      }
    }
    //generateRandom();
    _randomModulo();
}

 function _randomModulo() public {
       uint256 modulo = weightedDepositers.length - 1;
       uint256 _randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % modulo;
       _selectWinner(_randomNumber);
    }

function weigDepositers() public view returns (address[] memory) {
  return weightedDepositers;
}

function _selectWinner(uint _randomNumber) internal {
    Proposal storage proposal = proposals[tokenId];
    winningContributor = weightedDepositers[_randomNumber];
    controller.updatePropData(address(this), 10, proposal.orderId);
}


function claimAsset() external {
  require(msg.sender == winningContributor, "Only Winner can call.");    
  nftContract.transferFrom(address(this), winningContributor, tokenId);
  emit ProposalEvent("You recieved the Asset!");
}

function depositedAmount(address _depositer) public view returns(uint256) {
  uint256 depositAmount = deposits[_depositer];
  return depositAmount;
}

function countDepositers() view public returns (uint) {
      return depositersArray.length;
  }
    
function balanceOf() view public returns(uint) {
  return acceptedToken.balanceOf(address(this));
}

function getSummary(uint _tokenId) public view returns(uint) {
  uint contractBalance = proposals[_tokenId].balance;
  return contractBalance;
}

}

