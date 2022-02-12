import config from '../config'
import { Contract, BigNumber, utils } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function deployTokenLock(
  hre: HardhatRuntimeEnvironment,
  token: Contract,
  timelock: Contract,
  beneficiary: string,
  amount: BigNumber,
  revocable: boolean,
  vestingPeriods: number,
  cliffPeriods: number
): Promise<Contract> {
  const startTime = Math.floor(new Date(config.UNLOCK_BEGIN).getTime() / 1000)
  const endTime = startTime + (vestingPeriods * config.PERIOD)
  const releaseTime = startTime + config.ONE_YEAR
  const cliffTime = cliffPeriods > 0 ? startTime + (cliffPeriods * config.PERIOD) : 0

  console.log(
    'deploying token lock with args:',
    timelock.address, // owner
    beneficiary, // beneficiary
    token.address, // token
    amount, // managedAmount
    startTime, // startTime
    endTime, // endTime
    vestingPeriods, // periods
    releaseTime, // releaseStartTime
    cliffTime // vestingCliffTime
  )

  const TokenLock = await hre.ethers.getContractFactory('TokenLock')
  const tokenLock = await TokenLock.deploy()
  await tokenLock.deployed()

  await tokenLock.initialize(
    timelock.address, // owner
    beneficiary, // beneficiary
    token.address, // token
    amount, // managedAmount
    startTime, // startTime
    endTime, // endTime
    vestingPeriods, // periods
    releaseTime, // releaseStartTime
    cliffTime, // vestingCliffTime
    revocable ? 1 : 2
  )

  console.log('TokenLock deployed to:', tokenLock.address)

  // Transfer locked tokens to the tokenlock
  console.log('transferring tokens to tokenLock:', utils.formatUnits(amount))
  await (await token.transfer(tokenLock.address, amount)).wait()

  return tokenLock
}
