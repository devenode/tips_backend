const redis = require('redis').createClient();

exports.redisGet = async key => {
    return new Promise((res, rej) => {
        redis.get(key, (err, data) => {
            if (err) {
                rej(err);
                return;
            }
            res(data);
        });
    });
}

exports.redisSet = (key, data) => {
    redis.set(key, JSON.stringify(data));
}

exports.redisDel = async key => {
    return new Promise((res, rej) => {
        redis.del(key, (err, data) => {
            if (err) {
                rej(err);
                return;
            }
            res(data);
        });
    });
}

exports.redisSetex = (key, seconds, data) => {
    redis.setex(key, seconds, JSON.stringify(data));
}