import config from '../config'
import { Contract, utils } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
const { parseUnits, formatUnits } = utils

export async function distributeToken(
  hre: HardhatRuntimeEnvironment,
  token: Contract,
  timelock: Contract
) {
  const { ethers } = hre
  const accounts = await ethers.getSigners()
  const deployer = await accounts[0].getAddress()

  const companyDistributedTokens = parseUnits(config.COMPANY_DISTRIBUTED_TOKENS)
  await (await token.transfer(config.COMPANY_WALLET, companyDistributedTokens)).wait()
  const balance = await token.balanceOf(deployer)
  await (await token.transfer(timelock.address, balance)).wait()

  // Print out balances
  console.log('Token balances:')
  const daoBalance = await token.balanceOf(timelock.address)
  console.log(`  DAO: ${formatUnits(daoBalance)}`)
  const airdropBalance = await token.balanceOf(token.address)
  console.log(`  Airdrop: ${formatUnits(airdropBalance)}`)
  const companyBalance = await token.balanceOf(config.COMPANY_WALLET)
  console.log(`  Company: ${formatUnits(companyBalance)}`)
}
