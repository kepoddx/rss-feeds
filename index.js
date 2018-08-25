const {
    from
} = require('rxjs');
const {
    map,
    concat,
    concatAll
} = require('rxjs/operators');


const Feed = require('feed-to-json-promise')
    , feed = new Feed();

const yankees = 'http://rssfeeds.northjersey.com/northjerseyyankees&x=1';
const mets = 'http://rssfeeds.northjersey.com/northjerseymets&x=1';

let yankees$ = from(feed.load(yankees))
    .pipe(
        map((x) => x.items.slice(0, 4)),
);

let mets$ = from(feed.load(mets))
    .pipe(
        map((x) => x.items.slice(0, 4)),
);

let rss$ = yankees$.pipe(concat(mets$), concatAll());

const handler = (event, context, callback) => {
    rss$
    .subscribe(d => {
        callback(null, d)
    })
};

module.exports = {
    handler
}