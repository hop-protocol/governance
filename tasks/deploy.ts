import { deployTimelock } from '../deploy/timelock'
import { deployToken } from '../deploy/token'
import { deployGovernor } from '../deploy/governor'
import { deployTokenLock } from '../deploy/tokenLock'
import { distributeToken } from '../deploy/distributeToken'
import { setMerkleRoot } from '../deploy/setMerkleRoot'
import { transferOwnership } from '../deploy/transferOwnership'
import { Contract } from 'ethers'
import config from '../config'

export async function deploy(hre) {
  const timelock = await deployTimelock(hre)
  const token = await deployToken(hre)
  const governor = await deployGovernor(hre, token, timelock)

  const tokenLocks: Contract[] = []
  for (const recipientData of config.TOKEN_RECIPIENTS) {
    const tokenLock = await deployTokenLock(
      hre,
      token,
      timelock,
      recipientData.recipient,
      recipientData.amount,
      recipientData.revocable,
      recipientData.startPeriod,
      recipientData.releasePeriod,
      recipientData.vestingPeriods,
      recipientData.cliffPeriod
    )
    tokenLocks.push(tokenLock)
  }

  await distributeToken(hre, token, timelock)
  await setMerkleRoot(hre, token)
  await transferOwnership(token, timelock)

  console.log('All contracts deployed')
  return {
    timelock,
    token,
    governor,
    tokenLocks
  }
}
