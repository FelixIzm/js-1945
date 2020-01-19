const request = require('request');
const fs = require('fs');
var Cookie = require('request-cookies').Cookie;




const str_00 = 'bda88568a54f922fcdfc6dbf940e5d00';
const str_0b = '56105c9ab348522591eea18fbe4d080b';
const str_PNSESSIONID = 'PNSESSIONID';

function parse_file(f){
  let rawdata = fs.readFileSync(f);
  return  JSON.parse(rawdata);
}

const options_01 = {
  url: 'https://pamyat-naroda.ru/',
  headers: parse_file('./mu_files/mu_header1.txt'),
  cookies: parse_file('./mu_files/mu_cookie1.txt'),
  jar: true,
  followRedirect: false,
  method: 'GET'
};

var cookie_01 = {};
function callback_02(error,response,body){
  if (!error && response.statusCode == 200) {
    console.log(response.statusCode);
  }else if(!error && response.statusCode==307){
  }else{

  }
  
}
function callback_01(error, response, body) {
  if (!error && response.statusCode == 200) {
  }else if(!error && response.statusCode==307){
    var rawcookies = response.headers['set-cookie'];
    for (var i in rawcookies) {
        var cookie = new Cookie(rawcookies[i]);
        cookie_01[cookie.key] = cookie.value;
    }
    /*********************************************/
    /* Готовим ВТОРОЙ запрос с полученными куками*/
    /*********************************************/
    var options = {};
    cookies = parse_file('./mu_files/mu_cookie3.txt');
    cookies[str_00] = cookie_01[str_00];
    cookies[str_0b] = cookie_01[str_0b];
    cookies[str_PNSESSIONID] = cookie_01[str_PNSESSIONID];
    cookies['r'] = cookie_01[str_0b];
    headers = parse_file('./mu_files/mu_header3.txt');
    headers['Cookie'] = rawcookies;
    headers['Content-Type'] = 'application/json';
    options['url']= 'https://pamyat-naroda.ru/documents/';
    options['headers'] = headers;
    options['cookies'] = cookies;
    request.get(options,callback_02);

  }else{
    console.log('error');
  }
}
const req = request(options_01, callback_01);

