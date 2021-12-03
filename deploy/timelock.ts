import { ethers } from 'hardhat'
import config from '../config'
import { Contract } from 'ethers'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default async (): Promise<Contract> => {
  const Timelock = await ethers.getContractFactory('TimelockController')
  const timelock = await Timelock.deploy(
    config.MIN_TIMELOCK_DELAY,
    [],
    [ZERO_ADDRESS]
  )

  await timelock.deployed()

  console.log('Timelock deployed to:', timelock.address)

  return timelock
}
