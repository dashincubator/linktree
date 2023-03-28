const contract = require('./contract');
const document = require('./document');


function apps(contractId) {
    return {
        linktree: {
            contractId
        }
    };
}


const link = {
    contract: {
        link: {
            indices: [
                { properties: [{ $ownerId: 'asc' }], unique: false },
            ],
            properties: {
                name: {
                    type: 'string'
                },
                url: {
                    type: 'string'
                }
            },
            additionalProperties: false,
        }
    },
    documentName: 'linktree.link',

    delete: async (contractId, documents, identityId, mnemonic) => {
        if (!documents.length) {
            return [];
        }

        return await document.delete(apps(contractId), documents, identityId, mnemonic);
    },
    read: async (contractId, identityId) => {
        let query = {};

        if (identityId) {
            query['where'] = [
                ['$ownerId', Array.isArray(identityId) ? 'in' : '==', identityId]
            ];
        }

        return await document.read(apps(contractId), link.documentName, query);
    },
    register: async (identityId, mnemonic) => {
        return await contract.register(link.contract, identityId, mnemonic)
    },
    save: async (contractId, documents, identityId, mnemonic) => {
        if (!documents.length) {
            return [];
        }

        documents = document.defaults(documents, {
            name: 'default',
            url: 'default'
        });

        return await document.save(apps(contractId), documents, link.documentName, identityId, mnemonic);
    },

};


module.exports = { link };
