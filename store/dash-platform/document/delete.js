const Dash = require('dash');


const action = async (apps, documents, identityId, mnemonic) => {
    const client = new Dash.Client({
        apps,
        network: 'testnet',
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        },
    });
    const { platform } = client;
    const identity = await platform.identities.get(identityId);

    if (!documents.length) {
        return [];
    }

    return platform.documents.broadcast({ delete: documents }, identity)
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = action;
