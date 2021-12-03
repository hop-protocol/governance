import * as dotenv from 'dotenv'
import config from './config'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const hardhatConfig: HardhatUserConfig = {
  solidity: '0.8.7',
  networks: {
    hardhat: {
      initialDate: config.UNLOCK_BEGIN
      // tags: ['test']
    },
    mainnet: {
      url: process.env.RPC_ENDPOINT_MAINNET || '',
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : []
    },
    goerli: {
      url: process.env.RPC_ENDPOINT_GOERLI || '',
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : []
    }
  }
}

export default hardhatConfig
