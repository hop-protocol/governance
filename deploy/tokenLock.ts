import config from '../config'
import { Contract, BigNumber, utils } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function deployTokenLock (
  hre: HardhatRuntimeEnvironment,
  token: Contract,
  timelock: Contract,
  beneficiary: string,
  amount: BigNumber,
  revocable: boolean,
  startPeriod: number,
  releasePeriod: number,
  vestingPeriods: number,
  cliffPeriod: number
): Promise<Contract> {
  const unlockBegin = Math.floor(new Date(config.UNLOCK_BEGIN).getTime() / 1000)
  const startTime = unlockBegin + (startPeriod * config.PERIOD)
  const endTime = startTime + (vestingPeriods * config.PERIOD)
  const cliffTime = cliffPeriod > 0 ? startTime + (cliffPeriod * config.PERIOD) : 0
  let releaseTime = releasePeriod > 0 ? startTime + (releasePeriod * config.PERIOD) : 0
  if (releaseTime === endTime) {
    releaseTime = releaseTime - 1
  }

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
