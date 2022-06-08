import fs from 'fs'
import path from 'path'
import MerkleDataInterface from '../data/interfaces'
import { BigNumber, utils } from 'ethers'
import { airdropAddresses } from '../data/airdropAddresses'
import { authereumAddresses } from '../data/authereumAddresses'
import { discordAddresses } from '../data/discordAddresses'
import { individualContributorAddresses } from '../data/individualContributorAddresses'
import { testAddresses } from '../data/testAddresses'
import { twitterAddresses } from '../data/twitterAddresses'

export const dataDir = path.resolve(__dirname, '../data')
const { parseUnits } = utils

const allAddresses: Record<string, MerkleDataInterface[]> = {
  airdrop: airdropAddresses,
  authereum: authereumAddresses,
  discord: discordAddresses,
  individual: individualContributorAddresses,
  test: testAddresses,
  twitter: twitterAddresses
}

const expectedAmounts: Record<string, BigNumber> = {
  authereum: parseUnits('1000'),
  discord: parseUnits('1800'),
  test: parseUnits('0.01'),
  twitter: parseUnits('1800')
}

export function aggregateMerkleData (): void {
  let totalAmount: BigNumber = BigNumber.from('0')

  const finalData: Record<string, BigNumber> = {}
  for (const group in allAddresses) {
    const addresses = allAddresses[group]
    const expectedAmountPerGroup = expectedAmounts[group]
    let amountPerGroup: BigNumber = BigNumber.from('0')
    for (const data of addresses) {
      const address: string = data.address.toLowerCase()
      const amount: string = data.amount

      // Validate amount
      if (expectedAmountPerGroup && expectedAmountPerGroup.toString() !== amount) {
        throw new Error(`Invalid amount for ${address} in ${group}`)
      }

      if (!finalData[address]) {
        finalData[address] = BigNumber.from('0')
      }

      finalData[address] = finalData[address].add(amount)
      amountPerGroup = amountPerGroup.add(amount)
    }

    console.log(`${group} amount: ${amountPerGroup}`)
    totalAmount = totalAmount.add(amountPerGroup)
  }

  const airdropLocation = `${dataDir}/airdrop.json`
  if (fs.existsSync(airdropLocation)) {
    fs.unlinkSync(airdropLocation)
  }

  // Format output and write to file
  for (const address in finalData) {
    const balance: string = finalData[address].toString()
    const output = {
      owner: address,
      balance
    }

    fs.appendFileSync(airdropLocation, JSON.stringify(output) + '\n', 'utf-8')
  }

  console.log(`Total amount: ${totalAmount.toString()}`)
}
