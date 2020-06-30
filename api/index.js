const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV==='production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

const countryRouter = require('./controller/api');
const globalRouter = require('./controller/global');
const worldRouter = require('./controller/worldinfo');
const stateSummary = require('./controller/stateSummary');

app.use('/api', countryRouter);
app.use('/global', globalRouter);
app.use('/worldinfo', worldRouter);
app.use('/stateSummary', stateSummary);

// check if the app is on heroku then we run the following command
if(process.env.NODE_ENV==='production') {
    // get the build folder into the server
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    })
}


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})