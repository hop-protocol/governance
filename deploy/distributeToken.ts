import { ethers } from 'hardhat'
import config from '../config'
import { Contract } from 'ethers'

const oneToken = ethers.BigNumber.from(10).pow(18)

export default async (token: Contract, timelock: Contract, tokenLock: Contract) => {
  const accounts = await ethers.getSigners()
  const deployer = await accounts[0].getAddress()

  // Transfer locked tokens to the tokenlock
  if((await tokenLock.lockedAmounts(timelock.address)).eq(0)) {
    const lockedDAOTokens = oneToken.mul(config.LOCKED_DAO_TOKENS)
    await (await token.approve(tokenLock.address, lockedDAOTokens)).wait()
    await (await tokenLock.lock(timelock.address, lockedDAOTokens)).wait()
  }

  // Transfer free tokens to the timelock controller
  const totalContributorTokens = oneToken.mul(config.TOTAL_CONTRIBUTOR_TOKENS)
  const balance = await token.balanceOf(deployer)
  if(balance.gt(totalContributorTokens)) {
    await (await token.transfer(timelock.address, balance.sub(totalContributorTokens))).wait()
  }

  // Print out balances
  const daoBalance = await token.balanceOf(timelock.address)
  console.log('Token balances:')
  console.log(`  DAO: ${daoBalance.div(oneToken).toString()}`)
  const contributorBalance = await token.balanceOf(deployer)
  console.log(`  Contributors: ${contributorBalance.div(oneToken).toString()}`)
  const airdropBalance = await token.balanceOf(token.address)
  console.log(`  Airdrop: ${airdropBalance.div(oneToken).toString()}`)
  const tokenlockBalance = await token.balanceOf(tokenLock.address)
  console.log(`  TokenLock: ${tokenlockBalance.div(oneToken).toString()}`)
  const lockedDaoBalance = await tokenLock.lockedAmounts(timelock.address)
  console.log(`    DAO: ${lockedDaoBalance.div(oneToken).toString()}`)
  console.log(`    TOTAL: ${lockedDaoBalance.div(oneToken).toString()}`)
  const total = daoBalance.add(contributorBalance).add(airdropBalance).add(tokenlockBalance)
  console.log(`  TOTAL: ${total.div(oneToken).toString()}`)
}
