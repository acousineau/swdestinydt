const decryptSide = (side) => {
    // first character can be....
        // '+'
        // '-'
        // Number - value
        // 'Sp'

    // second character can be....
        // null
        // Number - modified value
        // 'R', 'F', 'D', 'R', 'D', 'M', 'S'

    // third character can be....
        // null
        // Number - cost
        // 'D', 'c', 'r', 'D', 'h'

    // fourth character can be...
        // null or Number - cost
    const baseSide = {
        symbol: null,
        value: null,
        cost: 0,
        modified: false,
    };

    // 1) check for blank or special....
    // match '-' or 'Sp'
    if (/^-/.test(side[0])) {
        baseSide.symbol = 'blank';
        return baseSide;
    } else if (/^Sp/.test(side.substring(0, 2))) {
        baseSide.symbol = 'special';
        // if 'Sp' assess if cost - then return obj
        if (/\d/.test(side.substring(2))) {
            baseSide.cost = parseInt(side.substring(2), 10)
        }
        return baseSide;
    }

    // 2) check first character for modifier or Number
    // if modifier
    if (/^[+]/.test(side[0])) {
        // flip modifier flag
        baseSide.modified = true;
        // get second character - save value
        baseSide.value = parseInt(side[1], 10)
    // else
    } else {
        // save value
        baseSide.value = parseInt(side[0], 10)
    }

    // 3) if modifier check third character to evaluate side otherwise check second side
    let sideValue = baseSide.modified ? 2 : 1
    // R
    if (/[R]/.test(side[sideValue])) {
        // check 3rd character
        // D => range
        // Number or null => resource
        baseSide.symbol = /[D]/.test(side[sideValue + 1]) ? 'range' : 'resource'
    }
    // F
    if (/[F]/.test(side[sideValue])) {
        // => focus
        baseSide.symbol = 'focus'
    }
    // D
    if (/[D]/.test(side[sideValue])) {
        // check 3rd character
        // c => discard
        // r => disrupt
        baseSide.symbol = /[c]/.test(side[sideValue + 1]) ? 'discard' : 'disrupt'
    }
    // M
    if (/[M]/.test(side[sideValue])) {
        // => melee
        baseSide.symbol = 'melee'
    }
    // S
    if (/[S]/.test(side[sideValue])) {
        // => shield
        baseSide.symbol = 'shield'
    }
    // X
    if (/[X]/.test(side[sideValue])) {
        // => none
        baseSide.symbol = 'none'
    }

    // 4) check last character if number - set cost
    if (/\d/.test(side.slice(-1))) {
        baseSide.cost = parseInt(side.slice(-1), 10)
    }

    return baseSide
}

// Lure of Power - 02016
// Launch Bay - 01031
// Hounds Tooth - 03020
// Captain Phasma - 01001
// Unkar Plutt - 02021
// Count Dooku - 01009
// Tie Pilot - 02004
// Training Remote - 03035
// Interrigation Droid - 02017

export default (cardCode) => {
    return fetch(`http://swdestinydb.com/api/public/card/${cardCode}.json?callback=my_callback`)
        .catch(err => Promise.reject('What did you do???'))
        .then(res => res.json())
        .then(card => {
            console.log(card.sides.map((s, i) => {
                return decryptSide(s)
            }))
            if (card.sides) {
                return {
                    cardName: card.label,
                    color: card.faction_code,
                    sides: card.sides.map((s, i) => {
                        return decryptSide(s)
                    })
                };
            } else {
                return Promise.reject('Card does not have a die.')
            }
        });
};
