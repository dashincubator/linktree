const cors = require('cors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const minifyHTML = require('express-minify-html');
const path = require('path');

const app = express();
const config = {
    directory: {
        routes: __dirname + '/routes'
    },
    host: '0.0.0.0',
    port: process.env.NODE_PORT || 8080
};

const platform = {
    identity: require('./store/dash-platform/identity'),
    linktree: require('./store/dash-platform/linktree'),
    name: require('./store/dash-platform/name')
};


app.disable('x-powered-by');

app.use(expressLayouts);
app.use(express.json());
app.use(express.static( path.join(__dirname, 'public') ));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

app.set('layout', './layouts/views/default');
app.set('views', path.join(__dirname, 'resources'));
app.set('view engine', 'ejs');

app.use((request, response, next) => {
    app.locals.components = path.join(__dirname, 'resources') + '/components/';
    app.locals.svg = path.join(__dirname, 'resources') + '/svg/';

    next();
});


// Setup Dash Platform Information
(async () => {
    let mnemonic = process.env.DASH_MNEMONIC;

    if (!process.env.DASH_IDENTITY) {
        let identity = await platform.identity.create(mnemonic),
            contract = await platform.linktree.link.register(identity, mnemonic);

        process.env.DASH_IDENTITY = identity;
        process.env.DASH_CONTRACT_ID = contract['$id'];
    }

    if (!process.env.DASH_NAME) {
        process.env.DASH_NAME = await platform.name.register(process.env.DASH_IDENTITY, mnemonic, 'linktree-demo');
    }

    console.log({
        identity: process.env.DASH_IDENTITY,
        contract: process.env.DASH_CONTRACT_ID,
        name: process.env.DASH_NAME
    });
})();


fs.readdirSync(config.directory.routes).forEach(function(file) {
    require(`${config.directory.routes}/${file}`)(app);
});


app.listen(config.port, config.host);
