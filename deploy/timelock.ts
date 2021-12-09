import config from '../config'
import { Contract } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export async function deployTimelock(hre: HardhatRuntimeEnvironment): Promise<Contract> {
  console.log('deploying timelock with args:', config.MIN_TIMELOCK_DELAY, [], [ZERO_ADDRESS])
  const Timelock = await hre.ethers.getContractFactory('TimelockController')
  const timelock = await Timelock.deploy(config.MIN_TIMELOCK_DELAY, [], [ZERO_ADDRESS])

  await timelock.deployed()

  console.log('Timelock deployed to:', timelock.address)

  return timelock
}
