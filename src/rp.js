var rp = require('request-promise');
const fs = require('fs');
var Cookie = require('request-cookies').Cookie;


function parse_file(f){
    let rawdata = fs.readFileSync(f);
    return  JSON.parse(rawdata);
  }
  
const options = {
    url: 'https://pamyat-naroda.ru/',
    headers: parse_file('./mu_files/mu_header1.txt'),
    cookies: parse_file('./mu_files/mu_cookie1.txt'),
    jar: true,
    followRedirect: false,
    method: 'GET'
};

var cookie_00 = {};

rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.statusCode);
    })
    .catch(function (err) {
        // API call failed...
        //console.log(err.response.headers['set-cookie']);
        var rawcookies = err.response.headers['set-cookie'];
        for (var i in rawcookies) {
            var cookie = new Cookie(rawcookies[i]);
            cookie_00[cookie.key] = cookie.value;
        }
        console.log(cookie_00);
    });
