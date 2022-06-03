import hre from 'hardhat'
import { ShardedMerkleTree } from '../src/merkle'

const tokenAddress = '0x0000000000000000000000000000000000000000'
const timelockAddress = '0x0000000000000000000000000000000000000000'

export async function setMerkleRoot() {
  const tokenFactory = await hre.ethers.getContractFactory('HOPToken')
  const token = tokenFactory.attach(tokenAddress)

  const { network } = hre
  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)

  console.log('setting merkle root: network, token, root', network.name, token.address, tree.root)

  await token.setMerkleRoot(tree.root)

  console.log('transferring ownership of token -> timelock', token.address, timelockAddress)

  // Transfer ownership of the token to the timelock controller
  await token.transferOwnership(timelockAddress)

  console.log('token ownership transferred to timelock')
}
