import hre from 'hardhat'
import { Contract } from 'ethers'
import { ShardedMerkleTree } from '../src/merkle'
const { network } = hre

export default async (token: Contract) => {
  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)

  await token.setMerkleRoot(tree.root)
}
