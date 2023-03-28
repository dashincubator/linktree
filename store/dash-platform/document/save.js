const Dash = require('dash');


const save = async (apps, documents, documentName, identityId, mnemonic) => {
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

    let batch = {},
        found = await platform.documents.get(documentName, [
            ['$ownerId', Array.isArray(identityId) ? 'in' : '==', identityId]
        ]),
        ids = documents.map(document => document['$id']);

    for (let i = 0, n = documents.length; i < n; i++) {
        let document = documents[i],
            id = document['$id'] || false;

        if (id) {
            let replace = found.find((document => document.id.toString() === id));

            if (!replace) {
                continue;
            }

            for (let k in document) {
                if (k == '$id') {
                    continue;
                }

                replace.set(k, document[k]);
            }

            if (!batch.replace) {
                batch.replace = [];
            }

            batch.replace.push(replace);
        }
        else {
            if (!batch.create) {
                batch.create = [];
            }

            document = await platform.documents.create(documentName, identity, document);
            batch.create.push(document);
        }
    }

    console.log(batch);

    return platform.documents.broadcast(batch, identity)
        .then((d) => d.toJSON())
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = save;
