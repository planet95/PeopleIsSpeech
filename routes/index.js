﻿exports.index = function (req, res) {
    res.render('index', { title: 'Who Is My Rep?' });
};

exports.search = function (req, res) {
    res.render('search', { title: 'Who Is My Rep?' });
};

