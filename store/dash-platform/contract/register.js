const Dash = require('dash');


const register = async (document, identityId, mnemonic) => {
    const client = new Dash.Client({
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
    const contract = await platform.contracts.create(document, identity);
    const validationResult = await platform.dpp.dataContract.validate(contract);

    if (validationResult.isValid()) {
        console.log('Validation passed, broadcasting contract...');

        return platform.contracts.broadcast(contract, identity)
            .then((d) => d.toJSON().dataContract)
            .catch((e) => console.error('Something went wrong:\n', e))
            .finally(() => client.disconnect());
    }

    console.error(validationResult);

    throw validationResult.errors[0];
};


module.exports = register;
