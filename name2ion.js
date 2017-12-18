const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ elements: [] }).write();

const elements = db.get('elements').value();

module.exports.getInfo = function(number) {
    return db.get('elements').find({ number: number }).value();
}

module.exports.getElements = function(text, elements) {
    const combs = getCombs(text.length);
    let result = [];
    combs.forEach(comb => {
        comb.forEach(subcomb => {
            let res = checkComb(subcomb, text, elements);
            if(res) {
                result = res;
            }
        });
    });
    return result;
}

getCombs = function(len) {
    const ranks = createRanksArray(len);
    combs = new Array();
    ranks.forEach(function(rank) {
        const comb = createComb(len, rank);
        combs.push(comb);
    });
    return combs;
}

createComb = function(len, num_of_2s) {
    const comb = new Array();
    for (var x = 0; x < (len - num_of_2s); x++) {
        const subcomb = createSubcombArray(1, len - num_of_2s);
        if(x + num_of_2s <= subcomb.length) {
            for (var i = x; i < (x + num_of_2s); i++) {
               subcomb[i] = 2;
            }
            comb.push(subcomb);
        }
    }
    return comb;
}

createSubcombArray = function(value, len) {
    const arr = new Array();
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}

createRanksArray = function(len) {
    const ranks = new Array();
    for (var x = 0; x < (len/2 + 1); x++) {
        ranks.push(x);
    }
    return ranks;
}

checkComb = function(comb, text, elements) {
    const text_arr = text.split('');
    let result = [];
    let level = 0;
    for (var n = 0; n < comb.length; n++) {
        const part = capitalize(text_arr.slice(level, level + comb[n]));
        elements.forEach(elem => {
            if(part == elem.symbol) {
                result.push(elem);
            }else{
                return;
            }
        });
        level += comb[n];
    }
    return (comb.length == result.length) ? result : false;
}

capitalize = function(s)
{
    return s[0].toUpperCase() + s.slice(1);
}