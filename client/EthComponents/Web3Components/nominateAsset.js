export const nominateAsset = async (contribution, text, reSalePrice, listPrice, userId) => {
    
  try {
    await ethereum.enable()

    const controller = await getInstance(UserController)
    const addresses = await eth.getAccounts()

    const result = await controller.createUser(
      Web3.utils.fromAscii(username), Web3.utils.fromAscii(firstName), Web3.utils.fromAscii(lastName), bio, gravatarEmail, {
      from: addresses[0], 
    })

    return result
  } catch (err) {
    console.error("Err:", err)
  }
}

