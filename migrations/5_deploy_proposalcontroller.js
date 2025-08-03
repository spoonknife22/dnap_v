//const SafeMath = artifacts.require("SafeMath")
const Div = artifacts.require("Div")
const ProposalController = artifacts.require('ProposalController')
const ContractManager = artifacts.require('ContractManager')

module.exports = (deployer) => {
  //deployer.deploy(ConvertLib);
  
  deployer.deploy(Div)

  deployer.link(Div, ProposalController)

  deployer.deploy(ProposalController)

  .then(() => {
    return ProposalController.deployed()
  })
  .then(ProposalCtrl => {
    ProposalCtrl.setManagerAddr(ContractManager.address) 
    return Promise.all([
      ContractManager.deployed()
    ])
  })
  .then(([manager]) => {
    return Promise.all([
      manager.setAddress("ProposalController", ProposalController.address)
    ])
  })
   
}