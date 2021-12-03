import deployTimelock from './timelock'
import deployToken from './token'
import deployGovernor from './governor'
import deployTokenLock from './tokenLock'
import distributeToken from './distributeToken'
import setMerkleRoot from './setMerkleRoot'
import transferOwnership from './transferOwnership'

(async () => {
  const timelock = await deployTimelock()
  const token = await deployToken()
  await deployGovernor(token, timelock)
  const tokenLock = await deployTokenLock(token)
  await distributeToken(token, timelock, tokenLock)
  await setMerkleRoot(token)
  await transferOwnership(token, timelock)

  console.log('All contracts deployed')
})()
