import { Contract } from 'ethers'
import { ShardedMerkleTree } from '../src/merkle'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function setMerkleRoot(hre: HardhatRuntimeEnvironment, token: Contract) {
  const { network } = hre
  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)

  console.log('setting merkle root: network, token, root', network.name, token.address, tree.root)

  await token.setMerkleRoot(tree.root)
}
