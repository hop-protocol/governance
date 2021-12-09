import config from '../config'
import { Contract } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function deployTokenLock(
  hre: HardhatRuntimeEnvironment,
  token: Contract
): Promise<Contract> {
  console.log(
    'deploying token lock with args:',
    token.address,
    Math.floor(new Date(config.UNLOCK_BEGIN).getTime() / 1000),
    Math.floor(new Date(config.UNLOCK_CLIFF).getTime() / 1000),
    Math.floor(new Date(config.UNLOCK_END).getTime() / 1000)
  )

  const TokenLock = await hre.ethers.getContractFactory('TokenLock')
  const tokenLock = await TokenLock.deploy(
    token.address,
    Math.floor(new Date(config.UNLOCK_BEGIN).getTime() / 1000),
    Math.floor(new Date(config.UNLOCK_CLIFF).getTime() / 1000),
    Math.floor(new Date(config.UNLOCK_END).getTime() / 1000)
  )

  await tokenLock.deployed()

  console.log('TokenLock deployed to:', tokenLock.address)

  return tokenLock
}
