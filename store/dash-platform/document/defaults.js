const defaults = (documents, values) => {
    if (Array.isArray(documents) && values) {
        for (let i = 0, n = documents.length; i < n; i++) {
            let document = documents[i];

            for (let k in values) {
                if (!document[k]) {
                    document[k] = value[k];
                }
            }

            documents[i] = document;
        }
    }

    return documents;
};


module.exports = defaults;
