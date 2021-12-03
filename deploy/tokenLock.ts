import { ethers } from 'hardhat'
import config from '../config'
import { Contract } from 'ethers'

export default async (token: Contract): Promise<Contract> => {
  const TokenLock = await ethers.getContractFactory('TokenLock')
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
