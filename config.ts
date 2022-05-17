import { utils } from 'ethers'

const { parseUnits } = utils

const config = {
  TOTAL_SUPPLY: '1000000000',
  DAO_TREASURY_TOKENS: '604958333.333333',

  UNLOCK_BEGIN: '2022-5-24',
  CLAIM_PERIOD_ENDS: '2022-11-24',
  MIN_TIMELOCK_DELAY: '172800',
  PERIOD: 2629743, // 1 month
  ONE_YEAR: 31556926,
  TOKEN_RECIPIENTS: [
    { // Token Lock 0
      recipient: '0x0000000000000000000000000000000000000001',
      amount: parseUnits('4500000'),
      revocable: true,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 1
      recipient: '0x0000000000000000000000000000000000000001',
      amount: parseUnits('1500000'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 2
      recipient: '0x0000000000000000000000000000000000000002',
      amount: parseUnits('2000000'),
      revocable: true,
      startPeriod: 24,
      releasePeriod: 0,
      vestingPeriods: 24,
      cliffPeriod: 0
    },
    { // Token Lock 3
      recipient: '0x0000000000000000000000000000000000000003',
      amount: parseUnits('31474405.751059'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 4
      recipient: '0x0000000000000000000000000000000000000004',
      amount: parseUnits('6205416.666667'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 5
      recipient: '0x0000000000000000000000000000000000000005',
      amount: parseUnits('4416666.666667'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 6
      recipient: '0x0000000000000000000000000000000000000006',
      amount: parseUnits('3533333.333333'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 7
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('2208333.333333'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 8
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('662500'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 9
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('220833.333333'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 10
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('9881391.393026'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 11
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('2984755.849519'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 12
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('2593820.613089'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 13
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('534465.664674'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 14
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('1236282.017619'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 15
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('1416006.148320'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 16
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('594353.882769'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 17
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('368552.390661'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 18
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('249975.763901'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 19
      recipient: '0x0000000000000000000000000000000000000007',
      amount: parseUnits('140396.274579'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    }
  ],
  COMPANY_DISTRIBUTED_TOKENS: '258320177.582274',
  COMPANY_WALLET: '0x404c2184a4027b0092C5877BC4599099cd63E62D'
}

export default config
