import { utils } from 'ethers'

const { parseUnits } = utils

const config = {
  TOTAL_SUPPLY: '1000000000',
  DAO_TREASURY_TOKENS: '604958333.333333',

  MERKLE_ROOT: '0x24007c66db4dfdaaa9a79e509286a8f164ea458846984c772272ff4aef327af3',
  AIRDROP_AMOUNT: '54818880.996683704802030999',

  UNLOCK_BEGIN: '2022-6-9',
  CLAIM_PERIOD_ENDS: '2022-12-9',
  MIN_TIMELOCK_DELAY: '172800',
  PERIOD: 2629743, // 1 month
  ONE_YEAR: 31556926,
  TOKEN_RECIPIENTS: [
    { // Token Lock 0
      recipient: '0x45Ad0ef471ed7cDaD80B9D77fC43a2dF43E0d4C8',
      amount: parseUnits('4500000'),
      revocable: true,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 1
      recipient: '0x45Ad0ef471ed7cDaD80B9D77fC43a2dF43E0d4C8',
      amount: parseUnits('1500000'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 2
      recipient: '0x45Ad0ef471ed7cDaD80B9D77fC43a2dF43E0d4C8',
      amount: parseUnits('2000000'),
      revocable: true,
      startPeriod: 24,
      releasePeriod: 0,
      vestingPeriods: 24,
      cliffPeriod: 0
    },
    { // Token Lock 3
      recipient: '0x492e34DcDEd8854C5dCbA29246162E272CC4778D',
      amount: parseUnits('31474405.751059'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 4
      recipient: '0xCc6E9C92e72Ef9bD694A04b62Cb51dbAaA658e3b',
      amount: parseUnits('6205416.666667'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 5
      recipient: '0x65cd0954d75d16684fa8D1e3cFe529A3Bf21ABAF',
      amount: parseUnits('4416666.666667'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 6
      recipient: '0xC865a52c3894025e0070b180b0e6e4E4731eE799',
      amount: parseUnits('3533333.333333'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 7
      recipient: '0xD684c4586c1d964D53837a70F17740D49E4D1105',
      amount: parseUnits('1184143.666666'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 8
      recipient: '0x76195a03252b453007c5e19bF06827c8D92e2854',
      amount: parseUnits('491021.150000'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 9
      recipient: '0xC92de97c8492b96DC8988F7FC1d80CF3ffD8B6E2',
      amount: parseUnits('533168.516667'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 10
      recipient: '0xcb68110C43C97b6051FEd5e2Bacc2814aDaD1688',
      amount: parseUnits('662500'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 11
      recipient: '0xd3F0862E4AcEf9A0c2D7FC4EAc9AB02c80D7b16c',
      amount: parseUnits('220833.333333'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 36,
      cliffPeriod: 12
    },
    { // Token Lock 12
      recipient: '0xcb68110C43C97b6051FEd5e2Bacc2814aDaD1688',
      amount: parseUnits('9881391.393026'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 13
      recipient: '0x68c4bBAA5Df76d973EB60B8bdC2Cf99a20a0592d',
      amount: parseUnits('1802685.5511'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 14
      recipient: '0xE6D0f631E0083b01D096B39C1d448C950CeDfF14',
      amount: parseUnits('383178.124515'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 15
      recipient: '0x306c213910Ee317eEDd9998d8c53fdCaC497E878',
      amount: parseUnits('161275.556291'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 16
      recipient: '0x77dE6d98EfD6f191b9760398dEF5Ac2a2f4a6Fa8',
      amount: parseUnits('432530.219552'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 17
      recipient: '0xf53Eb3bc17cDd55Faf393A76a276B6BC938c1921',
      amount: parseUnits('205086.399974'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 18
      recipient: '0x492e34DcDEd8854C5dCbA29246162E272CC4778D',
      amount: parseUnits('2593820.613089'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 19
      recipient: '0x87bC1B3e3db2a4C8d8Def57817ADdc93aFd5EA3f',
      amount: parseUnits('534465.664674'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 20
      recipient: '0xC92de97c8492b96DC8988F7FC1d80CF3ffD8B6E2',
      amount: parseUnits('1236282.017619'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 21
      recipient: '0xd85351181b3F264ee0FDFa94518464d7c3DefaDa',
      amount: parseUnits('1416006.148320'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 22
      recipient: '0x428D78C257490325D7Ed34779DFd2C406Ca71829',
      amount: parseUnits('71252.805751'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 23
      recipient: '0xF3C020AfF1daEe086022E21B2C96BB9698eB9065',
      amount: parseUnits('35925.784412'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 24
      recipient: '0x231a07c825f052b895de5fd1513ce40d18e14af5',
      amount: parseUnits('68041.258357'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 25
      recipient: '0x96b214e5767b905654446Fc7f2f65C642A0A1e98',
      amount: parseUnits('27216.503343'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 26
      recipient: '0x8c5D74C0211AeE986552E07143fD16870fd2536f',
      amount: parseUnits('13608.251671'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 27
      recipient: '0xa474a513755843242bd62d68f023a2928b917376',
      amount: parseUnits('27216.503343'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 28
      recipient: '0x47B1d5Ed53A4dECF61e50A50338B1Da3BeCaD5B6',
      amount: parseUnits('27216.503343'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 29
      recipient: '0x47B1d5Ed53A4dECF61e50A50338B1Da3BeCaD5B6',
      amount: parseUnits('27216.503343'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 30
      recipient: '0x742565C7FF96a89187062A72e15A3e7137b36DDF',
      amount: parseUnits('40824.755014'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 31
      recipient: '0x505b533941754551da5Cf81A879024769fAf279b',
      amount: parseUnits('112948.488873'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 32
      recipient: '0x9746447d8f9d1dedd70a470e419dfc472a7ebba5',
      amount: parseUnits('136082.516714'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 33
      recipient: '0xAEc043987E36b99149dA5194B15e992a9910f45E',
      amount: parseUnits('6804.125836'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 34
      recipient: '0xDA195CEd8D3ef4200E0CEf1b20BF12a0cFE6eD47',
      amount: parseUnits('368552.390661'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 35
      recipient: '0x25916943C800c4f4aA204B2943f667B866cBB9c0',
      amount: parseUnits('249975.763901'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    },
    { // Token Lock 36
      recipient: '0x1aa1F9f80f4c5dCe34d0f4faB4F66AAF562330bd',
      amount: parseUnits('140396.274579'),
      revocable: false,
      startPeriod: 0,
      releasePeriod: 12,
      vestingPeriods: 12,
      cliffPeriod: 0
    }
  ],
  COMPANY_DISTRIBUTED_TOKENS: '258320177.582274',
  COMPANY_WALLET: '0x404c2184a4027b0092C5877BC4599099cd63E62D',
  MULTISIG_TOKENS: '20000000',
  MULTISIG_ADDRESS: '0x60224984338DeDe521C56DEE7a09e446A5a163f4',
  TOKEN_ADDRESS: '0x0000000000000000000000000000000000000000',
  TIMELOCK_ADDRESS: '0x0000000000000000000000000000000000000000'
}

export default config
