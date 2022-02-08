const crypto = require('crypto');

exports.hash = password => {
    return crypto.createHash(`sha256`).update(password).digest(`hex`);
}

exports.verify = (hash, password) => {
    const current = crypto.createHash(`sha256`).update(password).digest(`hex`);
    return hash === current;
}