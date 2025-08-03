pragma solidity ^0.6.4;

//import "truffle/Assert.sol";
import "../../../../AppData/Roaming/npm/node_modules/truffle/build/Assert.sol";
import "../../contracts/Proposals/ProposalStorage.sol";

contract TestProposalStorage {
  ProposalStorage proposalStorage;

  constructor() public {
    proposalStorage = new ProposalStorage();
    proposalStorage.setControllerAddr(address(this));
  }

  function testCreateProposal() public {
    uint _userId = 1;
    uint _expectedProposalId = 1;

    Assert.equal(
      proposalStorage.createProposal(_userId, "Hello world!"),
      _expectedProposalId,
      "Should create Proposal with ID 1"
    );
  }
}