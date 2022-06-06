import config from '../config'
import path from 'path'
import { ethers, run } from 'hardhat'
import { expect } from 'chai'
import { BigNumber, Contract, Signer } from 'ethers'
import { setMerkleRoot } from '../deploy/setMerkleRoot'
import { ShardedMerkleTree } from '../src/merkle'

const airdropsDir = path.resolve(__dirname, '../airdrops')

describe('Hop Token', function () {
  let token: Contract
  let timelock: Contract

  before(async () => {
    const contracts = await run('deploy')
    ;({ token, timelock } = contracts)
    await setMerkleRoot(token.address, timelock.address)

    const expectedMerkleRoot = '0x87b0bbc5631fdd8ab4c56371322e3b4dfc369e126ce49176bba4f56dc70e7e84'
    if (config.MERKLE_ROOT !== expectedMerkleRoot) {
      throw new Error(`Update the merkle root to ${expectedMerkleRoot} for Token tests`)
    }
  })

  it('Should claim and delegate', async function () {
    // Merkle root with the following values:
    // 0x6d6926b5Cd8e82a43B581D9bA5c03606cdd4950f, 1000000000000000000
    // 0xAAA1dd500a91ae8E8888BCBf00279A80fC6886df, 950000000000000000000
    // 0x90F573Ae649bF762eF8Bd3b30464C2f9dDa8e220, 75000000000000000000000
    // Root: 0x87b0bbc5631fdd8ab4c56371322e3b4dfc369e126ce49176bba4f56dc70e7e84
    // Total: 75951000000000000000000

    const merkleTreeDir = `${airdropsDir}/test`
    const shardedMerkleTree = ShardedMerkleTree.fromFiles(merkleTreeDir)

    const accounts: Signer[] = await ethers.getSigners()
    const delegateAddress = '0x000000000000000000000000000000000000dEaD'
    let totalDelegatedAmount: BigNumber = BigNumber.from('0')
    const numAccounts = 3
    for (let i = 0; i < numAccounts; i++) {
      const account: Signer = accounts[i]
      const [entry, proof] = shardedMerkleTree.getProof(await account.getAddress())
      const amount = BigNumber.from(entry.balance)

      await token.connect(account).claimTokens(amount, delegateAddress, proof)

      // Validate user's claim and delegate
      const delegate = await token.delegates(await account.getAddress())
      expect(delegate).to.eq(delegateAddress)

      const userDelegatedAmount = await token.getVotes(await account.getAddress())
      expect(userDelegatedAmount).to.eq('0')

      totalDelegatedAmount = totalDelegatedAmount.add(amount)
      const delegatedAmount = await token.getVotes(delegateAddress)
      expect(totalDelegatedAmount).to.eq(delegatedAmount)
    }
  })
})
