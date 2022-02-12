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
  PERIOD: 2629743, // 1 month
  ONE_YEAR: 31556926,
  TOKEN_RECIPIENTS: [
    { // Token Lock 0
      recipient: '0x0000000000000000000000000000000000000001',
      amount: parseUnits('31474405.75'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 1
      recipient: '0x0000000000000000000000000000000000000002',
      amount: parseUnits('6205416.67'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 2
      recipient: '0x0000000000000000000000000000000000000003',
      amount: parseUnits('4416666.67'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 3
      recipient: '0x0000000000000000000000000000000000000004',
      amount: parseUnits('3533333.33'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 4
      recipient: '0x0000000000000000000000000000000000000005',
      amount: parseUnits('2208333.33'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 5
      recipient: '0x0000000000000000000000000000000000000006',
      amount: parseUnits('662500'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 6
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('220833.33'),
      revocable: false,
      vestingPeriods: 36,
      cliffPeriods: 0
    },
    { // Token Lock 7
      recipient: '0x0000000000000000000000000000000000000008',
      amount: parseUnits('6000000'),
      revocable: true,
      vestingPeriods: 48,
      cliffPeriods: 6
    }
  ],
  COMPANY_DISTRIBUTED_TOKENS: '258320177.58',
  COMPANY_WALLET: '0x404c2184a4027b0092C5877BC4599099cd63E62D'
}

export default config
