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

app.use(function *(next) {
    yield next;
    this.response.set('Expires', 'Wed, 25 Dec 2013 00:00:00 GMT');
})

app.get('/naughty/:name', function *(name) {
    var state = pick(name);

    if (state != 'naughty') {
        this.redirect('/nice/' + name);
    }
    this.body = state;
})

app.get('/nice/:name', function *(name) {
    var state = pick(name);

    if (state != 'nice') {
        this.redirect('/naughty/' + name);
    }
    this.body = state;
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started on port %s", port);
