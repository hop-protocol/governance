import { expect } from 'chai'
import { ethers } from 'hardhat'
const { utils } = ethers
const { parseUnits } = utils

describe('Hop Token', function () {
  it('Should deploy the token contract', async function () {
    const Token = await ethers.getContractFactory('HOPToken')
    const token = await Token.deploy(
      parseUnits('500000000'),
      parseUnits('500000000'),
      '1638436772'
    )

    await token.deployed()
    expect('1')
  })
})
