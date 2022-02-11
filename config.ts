import { utils } from 'ethers'

const { parseUnits } = utils

const config = {
  TOTAL_SUPPLY: '1000000000',
  DAO_TREASURY_TOKENS: '0',
  AUTHEREUM_LABS_TOKENS: '0',

  TOTAL_CONTRIBUTOR_TOKENS: '10000000',
  UNLOCK_BEGIN: '2022-2-30',
  CLAIM_PERIOD_ENDS: '2022-05-04',
  MIN_TIMELOCK_DELAY: '172800',
  PERIOD: 2419200, // 4 weeks
  ONE_YEAR: 31556926,
  TOKEN_RECIPIENTS: [
    {
      recipient: '0x0000000000000000000000000000000000000001',
      amount: parseUnits('1000000'),
      revocable: true,
      vestingPeriods: 156,
      cliffPeriods: 52
    }
  ]
}

export default config
