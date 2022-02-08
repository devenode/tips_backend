exports.full = req => {
   new URL(`${req.protocol}://${req.get(`host`)}${req.originalUrl}`);
}

exports.truncate = (string, length) => {
    if (string.length > length) return string.substr(0, length) + `...`;
    else return string;
}

exports.makeup = (numberStr, toFixed) => {
    const niceNumber = parseFloat(numberStr).toFixed(toFixed);
    return niceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
}

exports.capitalize = (string, isLower) => {
    if (isLower) string = string.toLowerCase();
    return string.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

exports.uploadImage = async (req, res, dir) => {
    const limits = { fileSize: 1000000 };
    const storage = multer.diskStorage({
        destination: (req, file, cb) => { cb(null, `${process.env.IMGS_PATH}/${dir}`) },
        filename: (req, file, cb) => { cb(null, `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`) }
    });

    const upload = multer({
        storage, limits, fileFilter: (req, file, cb) => {
            if (file.mimetype == `image/png`) {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error(`Only .png format allowed!`));
            }
        }
    }).single(`image`);

    const file = await new Promise((resolve, reject) => {
        upload(req, res, err => {
            if (err) reject(err);
            else resolve(req.file.filename);
        });
    });

    return file;
}

exports.uploadImages = async (req, res, dir, max) => {
    const limits = { fileSize: 1000000 };
    const storage = multer.diskStorage({
        destination: (req, file, cb) => { cb(null, `${process.env.IMGS_PATH}/${dir}`) },
        filename: (req, file, cb) => { cb(null, `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`) }
    });

    const upload = multer({
        storage, limits, fileFilter: (req, file, cb) => {
            if (file.mimetype == `image/png`) {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error(`Only .png format allowed!`));
            }
        }
    }).array(`image`, max);

    const data = await new Promise((resolve, reject) => {
        upload(req, res, err => {
            if (err) reject(err);
            else resolve(req.files);
        });
    });

    const files = data.map(el => el.filename);

    return files;
}