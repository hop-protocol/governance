# HOP Token Governance

## Commands

Note: you may need environment variables to run these commands (can be placed locally in a `.env` file): `ALCHEMY_KEY` and `HOP_MNEMONIC_TEST`

Build merkletree using data from [airdrop.json](./airdrop.json) and generate merkle tree proof chunks (data written to `./airdrops/[network]`)

    yarn mt [network]

Run hardhat ganache-cli instance on port 8545

    yarn chain

Run deploy scripts to local chain (8545) w/ `airdrops/localhost/root.json`

    yarn deploy:local

Run deploy scripts to specified network w/ `airdrops/[network]/root.json`

    yarn deploy [network]
