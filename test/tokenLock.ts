import config from '../config'
import { run } from 'hardhat'
import { expect } from 'chai'
import { Contract, utils } from 'ethers'
import { increaseTime, revertSnapshot, takeSnapshot } from './utils'
const { parseUnits } = utils

describe('Token Lock', function () {
  let tokenLocks: Contract[]

  let snapshotId: string

  before(async () => {
    const contracts = await run('deploy')
    ;({ tokenLocks } = contracts)

    // Use known token locks with varying vesting schedules
    tokenLocks = [
      tokenLocks[0], // 3 years, 1-year cliff
      tokenLocks[2], // 2-year delay, 2-year vesting
      tokenLocks[12] // 1-year lockup
    ]
  })

  beforeEach(async () => {
    snapshotId = await takeSnapshot()
  })

  afterEach(async () => {
    await revertSnapshot(snapshotId)
  })

  it('Should fully vest type 1', async function () {
    const tokenLock = tokenLocks[0]
    const numVestingYears = 3
    const annualRelease = parseUnits('4500000').div(numVestingYears)

    const numTotalYears = 3
    for (let i = 1; i <= numTotalYears; i++) {
      await increaseTime(config.ONE_YEAR)
      const releasableAmount = await tokenLock.releasableAmount()
      expect(releasableAmount).to.eq(annualRelease.mul(i))
    }
  })

  it('Should fully vest type 2', async function () {
    const tokenLock = tokenLocks[1]
    const numVestingYears = 2
    let annualRelease = parseUnits('2000000').div(numVestingYears)

    const numTotalYears = 4
    for (let i = 1; i <= numTotalYears; i++) {
      await increaseTime(config.ONE_YEAR)

      if (i === 1 || i === 2) continue

      // Adjust for HH timing discrepancy
      if (i === 3) {
        annualRelease = annualRelease.sub(4)
      } else if (i === 4) {
        annualRelease = annualRelease.add(4)
      }

      const releasableAmount = await tokenLock.releasableAmount()
      expect(releasableAmount).to.eq(annualRelease.mul(i - 2))
    }
  })

  it('Should fully vest type 3', async function () {
    const tokenLock = tokenLocks[2]
    const numVestingYears = 1
    const annualRelease = parseUnits('9881391.393026').div(numVestingYears)

    const numTotalYears = 1
    for (let i = 1; i <= numTotalYears; i++) {
      await increaseTime(config.ONE_YEAR)
      const releasableAmount = await tokenLock.releasableAmount()
      expect(releasableAmount).to.eq(annualRelease)
    }
  })
})
