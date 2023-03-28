const Dash = require('dash');


const read = async (mnemonic) => {
    const client = new Dash.Client({
        network: 'testnet',
        wallet: {
            mnemonic: mnemonic || null, // If null Generate New Wallet
            offlineMode: true,
        },
    });

    return client.getWalletAccount()
        .then((account) => {
            return {
                address: account.getUnusedAddress().address,
                mnemonic: client.wallet.exportWallet()
            };
        })
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = read;
