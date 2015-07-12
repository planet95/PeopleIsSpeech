exports.index = function (req, res) {
    res.render('index', { title: 'Who Is My Rep?' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Who Is My Rep?' });
};

exports.search = function (req, res) {
    res.render('search', { title: 'Who Is My Rep?' });
};

exports.searchpost = function (req, res) {
    res.redirect('search/' + req.body.zip)
 //   res.render('search', { title: 'Who Is My Rep?' });
};


