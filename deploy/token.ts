import hre from 'hardhat'
import { Contract } from 'ethers'
import config from '../config'
import { ShardedMerkleTree } from '../src/merkle'
const { ethers, network } = hre

export default async (): Promise<Contract> => {
  const Token = await ethers.getContractFactory('ENSToken')

  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)
  const totalSupply = ethers.BigNumber.from(10)
    .pow(18)
    .mul(config.TOTAL_SUPPLY)
  const token = await Token.deploy(
    totalSupply.sub(tree.total),
    tree.total,
    Math.floor(new Date(config.CLAIM_PERIOD_ENDS).getTime() / 1000)
  )

  await token.deployed()

  console.log('Token deployed to:', token.address)

  return token
}
