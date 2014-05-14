var request = require('request');
exports.legislators = function(req, res){
    var url = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+req.query.lat+'&longitude='+req.query.lon+'&apikey=4f40f44747c44a22ba19287b9e953e4c';
    request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var data = JSON.parse(body);
    res.render('data',{data:data.results});
  // res.render('data', { body: 'PplIsSpeech'});
   }
})
 
};
