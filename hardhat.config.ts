import * as dotenv from 'dotenv'
import config from './config'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import { ShardedMerkleTree } from './src/merkle'
import fs from 'fs'
import { deploy } from './tasks/deploy'

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task('deploy', 'Deploys contracts', async (taskArgs, hre) => {
  return await deploy(hre)
})

task('maketree', 'Generates a merkle airdrop tree', async (taskArgs, hre) => {
  let airdrops
  const shardNybbles = 2
  const { ethers } = hre

  airdrops = fs
    .readFileSync('airdrop.json', { encoding: 'utf-8' })
    .split('\n')
    .filter(x => x.length > 0)
    .map(line => {
      const data = JSON.parse(line)
      const owner = data.owner
      delete data.owner
      data.balance = ethers.BigNumber.from(data.past_tokens.toString().split('.')[0])
        .add(ethers.BigNumber.from(data.future_tokens.toString().split('.')[0]))
        .toString()
      return [owner, data]
    })

  ShardedMerkleTree.build(airdrops, shardNybbles, `airdrops/${hre.network.name}`)
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const accounts = process.env.DEPLOYER_PRIVATE_KEY !== undefined ? [process.env.DEPLOYER_PRIVATE_KEY] : []

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.7'
      },
      {
        version: '0.7.3'
      }
    ]
  },
  networks: {
    hardhat: {
      initialDate: config.UNLOCK_BEGIN,
      // tags: ['test']
      accounts: {
        mnemonic: process.env.HOP_MNEMONIC_TESTNET
      }
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts: {
        mnemonic: process.env.HOP_MNEMONIC_TESTNET
      }
    },
    mainnet: {
      url: process.env.RPC_ENDPOINT_MAINNET || '',
      accounts
    },
    goerli: {
      url: process.env.RPC_ENDPOINT_GOERLI,
      accounts
    },
    rinkeby: {
      url: process.env.RPC_ENDPOINT_RINKEBY,
      accounts
    },
    ropsten: {
      url: process.env.RPC_ENDPOINT_ROPSTEN,
      accounts
    }
  },
  mocha: {
    timeout: 600_000
  }
}

export default hardhatConfig
