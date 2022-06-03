import { utils } from 'ethers'
import config from '../config'
import { ShardedMerkleTree } from '../src/merkle'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function deployToken(hre: HardhatRuntimeEnvironment): Promise<any> {
  const { ethers, network } = hre
  const Token = await ethers.getContractFactory('HOPToken')
  const tree = ShardedMerkleTree.fromFiles(`airdrops/${network.name}`)
  const totalSupply = ethers.BigNumber.from(10).pow(18).mul(config.TOTAL_SUPPLY)

  console.log(
    'deploying token with args:',
    utils.formatUnits(totalSupply.sub(tree.total)),
    utils.formatUnits(tree.total),
    Math.floor(new Date(config.CLAIM_PERIOD_ENDS).getTime() / 1000)
  )

  const token = await Token.deploy(
    totalSupply.sub(tree.total),
    tree.total,
    Math.floor(new Date(config.CLAIM_PERIOD_ENDS).getTime() / 1000)
  )

  await token.deployed()

  console.log('Token deployed to:', token.address)

  return token
}
