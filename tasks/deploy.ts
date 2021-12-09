import { deployTimelock } from '../deploy/timelock'
import { deployToken } from '../deploy/token'
import { deployGovernor } from '../deploy/governor'
import { deployTokenLock } from '../deploy/tokenLock'
import { distributeToken } from '../deploy/distributeToken'
import { setMerkleRoot } from '../deploy/setMerkleRoot'
import { transferOwnership } from '../deploy/transferOwnership'

export async function deploy(hre) {
  const timelock = await deployTimelock(hre)
  const token = await deployToken(hre)
  await deployGovernor(hre, token, timelock)
  const tokenLock = await deployTokenLock(hre, token)
  await distributeToken(hre, token, timelock, tokenLock)
  await setMerkleRoot(hre, token)
  await transferOwnership(token, timelock)

  console.log('All contracts deployed')
}
