const platform = {
    linktree: require('../store/dash-platform/linktree')
};


module.exports = function(app) {
    app.get('/edit', async (req, res) => {
        let links = await platform.linktree.link.read(process.env.DASH_CONTRACT_ID, process.env.DASH_IDENTITY);

        links = links.map(link => {
            let data = link.data;
                data['$id'] = link.id.toString();

            return data;
        });

        res.status(200).render('pages/edit/views/edit', {
            links: links || [],
            name: process.env.DASH_NAME || 'User not found'
        });
    });

    app.post('/edit', async (req, res) => {
        let save = Object.values(req.body.links || {}),
            storage = await platform.linktree.link.read(process.env.DASH_CONTRACT_ID, process.env.DASH_IDENTITY);

        let ids = save.map(link => link['$id']),
            remove = storage.filter(document => !ids.includes(document.id.toString()));

        await platform.linktree.link.delete(process.env.DASH_CONTRACT_ID, remove, process.env.DASH_IDENTITY, process.env.DASH_MNEMONIC);

        if (save.length) {
            await platform.linktree.link.save(process.env.DASH_CONTRACT_ID, save, process.env.DASH_IDENTITY, process.env.DASH_MNEMONIC);
        }

        res.redirect('/edit');
    });
};
