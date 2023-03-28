const Dash = require('dash');


const read = async (contractId) => {
    const client = new Dash.Client({ network: 'testnet' });

    return client.platform.contracts.get(contractId)
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
}


module.exports = read;
