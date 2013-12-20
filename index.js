var koa = require('koa');
var app = koa();

app.use(require('koa-router')(app));

var names = {};

function pick(name) {
    if (!(name in names)) {
        var state = ['naughty', 'nice'][Math.floor(Math.random()*2)];
        console.log('Assigned %s to %s', name, state);
        names[name] = state;
    }
    return names[name];
}

app.get('/naughty/:name', function *(name) {
    var state = pick(name);

    if (state == 'naughty') {
        this.body = 'OK';
    } else {
        this.status = 404;
        this.body = 'NO';
    }
})

app.get('/nice/:name', function *(name) {
    var state = pick(name);

    if (state == 'nice') {
        this.body = 'OK';
    } else {
        this.status = 404;
        this.body = 'NO';
    }
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started on port %s", port);
