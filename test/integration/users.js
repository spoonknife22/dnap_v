
const UserStorage = artifacts.require('UserStorage')
const UserController = artifacts.require('UserController')


const utils = require('../utils')
const { assertVMException } = utils

contract('users', () => {
  
  contract('users', () => {

    it("can create user with controller", async () => {
      const controller = await UserController.deployed()
  
      const tx = await controller.createUser(
        web3.utils.fromAscii("isaiah")
      )
  
      assert.isOk(tx)
    })

    it("can't create user without controller", async () => {
      const storage = await UserStorage.deployed()
  
      try {
        const tx = await storage.createUser(
          0x0,
          "isaiah"
        )
        assert.fail();
      } catch (err) {
        assertVMException(err);
      }
    })

  // Add the following test:
  it("can get user", async () => {
    const storage = await UserStorage.deployed()
    const userId = 1
    
    // Get the userInfo array
    const userInfo = await storage.profiles.call(userId)
    
    // Get the second element (the username)
    const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '')

    assert.equal(username, "isaiah")
  });

})
})