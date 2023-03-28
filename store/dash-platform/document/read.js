const Dash = require('dash');


const read = async (apps, documentName, query) => {
    const client = new Dash.Client({
        apps,
        network: 'testnet',
    });

    return client.platform.documents.get(documentName, query)
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = read;
