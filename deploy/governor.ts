import { Contract } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export async function deployGovernor(
  hre: HardhatRuntimeEnvironment,
  token: Contract,
  timelock: Contract
): Promise<Contract> {
  const { ethers } = hre
  console.log('deploying governor with args:', token.address, timelock.address)
  const Governor = await ethers.getContractFactory('HOPGovernor')
  const governor = await Governor.deploy(token.address, timelock.address)

  await governor.deployed()

  console.log('Granting role')
  await (await timelock.grantRole(await timelock.PROPOSER_ROLE(), governor.address)).wait()
  const accounts = await ethers.getSigners()
  const deployer = await accounts[0].getAddress()

  console.log('Revoking role')
  await (await timelock.revokeRole(await timelock.TIMELOCK_ADMIN_ROLE(), deployer)).wait()

  console.log('Governor deployed to:', governor.address)

  return governor
}
