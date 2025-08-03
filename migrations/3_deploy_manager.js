var ContractManager = artifacts.require('ContractManager')
var UserStorage = artifacts.require('UserStorage');
var ProposalStorage = artifacts.require('ProposalStorage');

module.exports = (deployer) => {
  
  deployer.deploy(ContractManager)
  .then(() => {
    return ContractManager.deployed()
  })
  .then(manager => {
    return Promise.all([
      manager.setAddress("UserStorage", UserStorage.address),
      manager.setAddress("ProposalStorage", ProposalStorage.address),
    ])
  })

}
