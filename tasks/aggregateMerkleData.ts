import fs from 'fs'
import path from 'path'

import { BigNumber } from 'ethers'
import { airdropAddresses } from '../data/airdropAddresses'
import { authereumAddresses } from '../data/authereumAddresses'
import { discordAddresses } from '../data/discordAddresses'
import { individualContributorAddresses } from '../data/individualContributorAddresses'
import { testAddresses } from '../data/testAddresses'
import { twitterAddresses } from '../data/twitterAddresses'

export const dataDir = path.resolve(__dirname, '../data')

const allAddresses: any[] = [
  airdropAddresses,
  authereumAddresses,
  discordAddresses,
  individualContributorAddresses,
  testAddresses,
  twitterAddresses
]

export async function aggregateMerkleData () {
  let totalAmount = BigNumber.from('0')
  const finalData: Record<string, string> = {}
  for (const addresses of allAddresses) {
    for (const data of addresses) {
      const address: string = data.address.toLowerCase()
      const amount: BigNumber = BigNumber.from(data.amount)

      if (!finalData[address]) {
        finalData[address] = '0'
      }

      const currentAmount: BigNumber = BigNumber.from(finalData[address])
      finalData[address] = (currentAmount.add(amount)).toString()

      totalAmount = totalAmount.add(amount)
    }
  }

  const airdropLocation = `${dataDir}/airdrop.json`
  if (fs.existsSync(airdropLocation)) {
    fs.unlinkSync(airdropLocation)
  }

  // Format output and write to file
  for (const address in finalData) {
    const balance = finalData[address]
    const output = {
      owner: address,
      balance
    }

    fs.appendFileSync(airdropLocation, JSON.stringify(output), 'utf-8')
  }

  console.log(`Total amount: ${totalAmount}`)
}
