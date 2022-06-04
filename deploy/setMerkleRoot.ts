import hre from 'hardhat'
import config from '../config'

export async function setMerkleRoot() {
  const tokenFactory = await hre.ethers.getContractFactory('HOPToken')
  const token = tokenFactory.attach(config.TOKEN_ADDRESS)

  const { network } = hre

  console.log('setting merkle root: network, token, root', network.name, token.address, config.MERKLE_ROOT)

  await token.setMerkleRoot(config.MERKLE_ROOT)

  console.log('transferring ownership of token -> timelock', token.address, config.TIMELOCK_ADDRESS)

  // Transfer ownership of the token to the timelock controller
  await token.transferOwnership(config.TIMELOCK_ADDRESS)

  console.log('token ownership transferred to timelock')
}
