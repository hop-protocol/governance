import hre from 'hardhat'
import { Contract } from 'ethers'
const { ethers } = hre

export default async (token: Contract, timelock: Contract): Promise<Contract> => {
  const Governor = await ethers.getContractFactory('ENSGovernor')
  const governor = await Governor.deploy(
    token.address,
    timelock.address
  )

  await governor.deployed()

  await (await timelock.grantRole(await timelock.PROPOSER_ROLE(), governor.address)).wait()
  const accounts = await ethers.getSigners()
  const deployer = await accounts[0].getAddress()
  await (await timelock.revokeRole(await timelock.TIMELOCK_ADMIN_ROLE(), deployer)).wait()

  console.log('Governor deployed to:', governor.address)

  return governor
}
