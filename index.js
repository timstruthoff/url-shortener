const express = require('express');
const bodyParser = require('body-parser');
const hri = require('human-readable-ids').hri;

const app = express();
const port = 80;

const myData = {};

const createShortFromId = id => {
    return `http://localhost:${port}/${id}`
};

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send(`
<form method="POST" action="/create">
  <input type="text" name="userurl"><br>
  <input type="submit">
</form>
    `)
});

app.get('/:userurl', (req, res) => {

    let id = req.params.userurl;

    if (id == undefined) {
        res.send('no url specified');
        return;
    }

    let userurl = myData[id];

    if (userurl == undefined) {
        res.send('no url for this id');
        return;
    }



    res.redirect(userurl);
    //res.redirect(userurl)
});

app.post('/create', function(req, res) {
    let userurl = req.body.userurl;
    let id = hri.random();

    console.log(req.body);

    myData[id] = userurl;

    res.send(`
<h1>You just shorted an URL :)</h1>
<p>Original URL: ${userurl}</p>
<p>Your shortened url: <a href="${createShortFromId(id)}">${createShortFromId(id)}</a></p>
    `);

    console.log(myData);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});