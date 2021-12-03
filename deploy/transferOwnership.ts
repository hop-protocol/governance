import hre from 'hardhat'
import { Contract } from 'ethers'
import { ShardedMerkleTree } from '../src/merkle'
const { ethers, network } = hre

export default async (token: Contract, timelock: Contract) => {
  // Transfer ownership of the token to the timelock controller
  await token.transferOwnership(timelock.address)

  console.log('token ownership transferred to timelock')
}
