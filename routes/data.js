var request = require('request');

exports.legislators = function(req, res){
    var url = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+req.query.lat+'&longitude='+req.query.lon+'&apikey=4f40f44747c44a22ba19287b9e953e4c';
    request(url, function (error, response, data) {
  if (!error && response.statusCode == 200) {
     var data = JSON.parse(data);
           var districts = [];
      for (var i in data.results)
      {
        if(data.results[i].district != null)
        {
          districts.push(data.results[i].district);
        }
      }
      

    data.results.sort(function(a,b){
      return a.chamber.localeCompare(b.chamber);
    });
    res.render('data',{data:data.results, district: districts, state:districts[0].state});
   }
});};

exports.zipcode = function (req, res) {
  var url = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + req.param("zip") + '&apikey=4f40f44747c44a22ba19287b9e953e4c';
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(data);
     console.log(data);
      var districts = [];
      for (var i in data.results)
      {
        if(data.results[i].district != null)
        {
          districts.push(data.results[i].district);
        }
      }
    data.results.sort(function(a,b){
      return a.chamber.localeCompare(b.chamber);
    });
      if (data.count != 0)
        res.render('results', { data: data.results, district: districts});
      else
        res.render('error', { data: 'Zip/Postal Code not found' });
    }
  });
};
//ocd-division/country:us/state:nc/sldl:103

exports.districts = function (req, res) {
  //state districts
  //var url = encodeURI('http://openstates.org/api/v1/districts/boundary/ocd-division/country:us/state:'+ req.param("state")+'/sldl:' + req.param("district") + '/?apikey=4f40f44747c44a22ba19287b9e953e4c');
 var url = encodeURI('http://gis.govtrack.us/boundaries/cd-2012/'+ req.param("state")+'-' + req.param("district") + '/shape');
 console.log(url);
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(data);
      console.log(data);
      res.json(data);
    }
  });
};