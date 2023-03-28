const Dash = require('dash');


async function r(identity, name, platform) {
    return platform.names.register(
        `${name}.dash`,
        { dashUniqueIdentityId: identity.getId() },
        identity,
    )
}


const register = async (identityId, mnemonic, name) => {
    const client = new Dash.Client({
        network: 'testnet',
        wallet: {
            mnemonic,
            unsafeOptions: {
                skipSynchronizationBeforeHeight: 415000, // only sync from start of 2021
            },
        }
    });

    const { platform } = client;
    const identity = await platform.identities.get(identityId);

    return r(identity, name, platform)
        .then((d) => d.toJSON().label)
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = register;
