import hre from 'hardhat'
import { ShardedMerkleTree } from '../src/merkle'

const tokenAddress = '0x0000000000000000000000000000000000000000'

export async function setMerkleRoot() {
  const tokenFactory = await hre.ethers.getContractFactory('ENSToken')
  const token = tokenFactory.attach(tokenAddress)

  const { network } = hre
  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)

  console.log('setting merkle root: network, token, root', network.name, token.address, tree.root)

  await token.setMerkleRoot(tree.root)
}
