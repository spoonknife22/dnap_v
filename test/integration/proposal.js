const ProposalStorage = artifacts.require('ProposalStorage')
const ProposalController = artifacts.require('ProposalController')
const UserController = artifacts.require("UserController") 

const utils = require('../utils')
const { assertVMException } = utils

contract('Proposals', () => {
 


    before(async () => {
      const userCtrl = await UserController.deployed();
      
      const username = web3.utils.fromAscii("tristan")
      
      await userCtrl.createUser(
        username
      );
    });
      
    it("can create Proposal with controller", async () => {
      const controller = await ProposalController.deployed()
  
      const tx = await controller.createProposal("Hello world!")
  
      assert.isOk(tx)
    })

  it("can get Proposal", async () => {

    const storage = await ProposalStorage.deployed()

    const Proposal = await storage.Proposals.call(1) // Get the data
    const { id, text, userId } = Proposal // Destructure the data

    // Check if the different parts contain the expected values:
    assert.equal(parseInt(id), 1)
    assert.equal(text, "Hello world!")
    assert.equal(parseInt(userId), 1)
  })

  it("can get all Proposals IDs from user", async () => {
    const storage = await ProposalStorage.deployed()

    const userId = 1
    const ids = await storage.getProposalIdsFromUser.call(userId)

    const expectedProposalId = 1

    assert.isOk(Array.isArray(ids))
    assert.equal(ids[0], expectedProposalId)
  })

})