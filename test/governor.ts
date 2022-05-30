import config from '../config'
import { ethers, run } from 'hardhat'
import { expect } from 'chai'
import { Contract, Signer, utils } from 'ethers'
import { mineBlock, mineBlocks } from './utils'
const { parseUnits, solidityKeccak256 } = utils

describe('Governor', function () {
  let token: Contract
  let governor: Contract
  let tokenLocks: Contract[]
  let recipient: Signer

  before(async () => {
    const contracts = await run('deploy')
    ;({ token, governor, tokenLocks } = contracts)
    const accounts: Signer[] = await ethers.getSigners()
    recipient = accounts[1]

    // Company wallet needs to be updated for testing purposes
    const expectedCompanyWallet = await recipient.getAddress()
    if (config.COMPANY_WALLET !== expectedCompanyWallet) {
      throw new Error(`Update the company wallet to ${expectedCompanyWallet} for governance tests`)
    }
  })

  it('Should revoke remaining tokens immediately after deployment', async function () {
    const daoVoter: Signer = recipient
    const tokenLock: Contract = tokenLocks[0]

    // Ensure tokenLock has vesting tokens
    let tokenLockBalance = await token.balanceOf(tokenLock.address)
    const expectedAmount = parseUnits('4500000')
    expect(tokenLockBalance).to.eq(expectedAmount)

    // Delegate tokens to self
    await token.connect(daoVoter).delegate(await daoVoter.getAddress())

    // Create DAO proposal
    const revokeParams = [
      [tokenLock.address], // target
      ['0'], // value
      ['0xb6549f75'], // data (revoke())
      'Revoke tokens' // description
    ]
    await governor.connect(daoVoter).propose(...revokeParams)

    // Advance time to enter Active Phase of proposal
    const votingDelay = await governor.votingDelay()
    await mineBlocks(votingDelay)

    // Vote on DAO proposal
    revokeParams[3] = solidityKeccak256(['string'], [revokeParams[3]])
    const proposalId = await governor.hashProposal(...revokeParams)
    await governor.connect(daoVoter).castVote(
      proposalId,
      1
    )

    // Advance time to end voting period of proposal
    const votingPeriod = await governor.votingPeriod()
    await mineBlocks(Number(votingPeriod))

    // Execute the queueing of the transaction
    await governor.connect(daoVoter).queue(...revokeParams)

    // Advance time for timelock to pass
    await mineBlock(Number(config.MIN_TIMELOCK_DELAY))

    // Execute the transaction
    await governor.connect(daoVoter).execute(...revokeParams)

    // Validate balances
    tokenLockBalance = await token.balanceOf(tokenLock.address)
    expect(tokenLockBalance).to.eq(0)
  })
})
