const Dash = require('dash');


// Identity key is $ownerId
const read = async (name) => {
    const client = new Dash.Client({ network: 'testnet' });

    return client.platform.names.search(name, 'dash')
        .then((d) => {
            let names = [];

            for (let i = 0, n = d.length; i < n; i++) {
                names.push(d[i].toJSON());
            }

            return names;
        })
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());
};


module.exports = read;
