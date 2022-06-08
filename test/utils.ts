import { ethers } from 'hardhat'

export const takeSnapshot = async () => {
  return await ethers.provider.send('evm_snapshot', [])
}

export const revertSnapshot = async (id: string) => {
  await ethers.provider.send('evm_revert', [id])
}

export const mineBlocks = async (numBlocks: number) => {
  for (let i = 0; i <= numBlocks; i++) {
    await mineBlock(1)
  }
}

export const mineBlock = async (seconds: number) => {
  const blockTimestamp: number = (await ethers.provider.getBlock('latest'))
    .timestamp
  await ethers.provider.send('evm_mine', [blockTimestamp + seconds])
}

export const increaseTime = async (seconds: number) => {
  await mineBlock(seconds)
}

export const minerStop = async () => {
  await ethers.provider.send('miner_stop', [])
}

export const minerStart = async () => {
  await ethers.provider.send('miner_start', [])
}
