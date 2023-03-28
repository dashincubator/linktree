const platform = {
    linktree: require('../store/dash-platform/linktree'),
    name: require('../store/dash-platform/name'),
};


module.exports = function(app) {
    app.get('/', async (req, res) => {
        let links = [];

        // 'name' Not really required now but will be when displaying links using DASH username provided by URL param.
        let name = process.env.DASH_NAME;
        // let names = await platform.name.read(name);
        //
        // if (names.length) {
        //     links = await platform.linktree.link.read(process.env.DASH_CONTRACT_ID, (names[0] || {})['$ownerId']);
        // }

        // let data = await platform.linktree.link.save(process.env.DASH_CONTRACT_ID, [
        //     {
        //         name: 'first',
        //         url: 'https://www.google.com'
        //     }
        // ], process.env.DASH_IDENTITY, process.env.DASH_MNEMONIC);

        links = await platform.linktree.link.read(process.env.DASH_CONTRACT_ID, process.env.DASH_IDENTITY);
        links = links || [];

        console.log(links);

        links = links.map(link => {
            let data = link.data;
                data['$id'] = link.id.toString();

            return data;
        });

        console.log(links);

        res.status(200).render('pages/index/views/index', {
            alerts: {
                success: [
                    'Avatar should be replaced using Dash Platform avatar system',
                    'Ideally edit linktree page should be integrated into Dash Platform extension'
                ]
            },
            links: links || [],
            name: name || 'User not found'
        });
    });
};
