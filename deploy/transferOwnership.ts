import { Contract } from 'ethers'

export async function transferOwnership(token: Contract, timelock: Contract) {
  console.log('transferring ownership of token -> timelock', token.address, timelock.address)

  // Transfer ownership of the token to the timelock controller
  await token.transferOwnership(timelock.address)

  console.log('token ownership transferred to timelock')
}
