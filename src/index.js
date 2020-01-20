const request = require('request');
const fs = require('fs');
var Cookie = require('request-cookies').Cookie;




const str_00 = 'bda88568a54f922fcdfc6dbf940e5d00';
const str_0b = '56105c9ab348522591eea18fbe4d080b';
const str_PNSESSIONID = 'PNSESSIONID';
var cook_00 = cook_0b = cook_PNSESSIONID = '';


function parse_file(f){
  let rawdata = fs.readFileSync(f);
  return  JSON.parse(rawdata);
}

function dict2str(dict){
	_str = '';
	for (const [key, value] of Object.entries(dict)) {
		_str+=key+"="+value+"; ";
	}
	return _str;
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


function callback_03(error,response,body){
  var options = {};
  var cookie_03 = {};
  console.log("3 = "+response.statusCode);
  if (!error && response.statusCode == 200) {
    var rawcookies = response.headers['set-cookie'];
    for (var i in rawcookies) {
      var cookie = new Cookie(rawcookies[i]);
      cookie_03[cookie.key] = cookie.value;
    }
    /*******************************************/
    /*******  Готовим ЧЕТВЕРТЫЙ ЗАПРОС *********/
    /*******************************************/
    bs = cook_00;
    bs += "=" * ((4 - cook_00.length % 4) % 4);
    console.log('bs = '+bs);
    bs = Buffer.from(bs, 'base64').toString('ascii');
    a_bs = bs.split('XXXXXX')[0];
    b_bs = bs.split('XXXXXX')[1].split('YYYYYY')[0];
    console.log(bs);
    console.log('a_bs = '+a_bs);
    console.log('b_bs = '+b_bs);

  }else{
	//console.log(error);
  }
}

function callback_02(error,response,body){
  var options = {};
  var cookie_02 = {};
  if (!error && response.statusCode == 200) {
    console.log("2 = "+response.statusCode);
    var rawcookies = response.headers['set-cookie'];
    for (var i in rawcookies) {
      var cookie = new Cookie(rawcookies[i]);
      cookie_02[cookie.key] = cookie.value;
    }
    /****************************************/
    /*******  Готовим ТРЕТИЙ ЗАПРОС *********/
    /****************************************/
    
    cookies = parse_file('./mu_files/mu_cookie3.txt');
    cookies[str_00] = cookie_02[str_00]
    cookies[str_0b] = cook_0b;
    cookies[str_PNSESSIONID] = cook_PNSESSIONID;
    cookies['r'] = cook_0b;
    headers = parse_file('./mu_files/mu_header3.txt');
    headers['Cookie'] = dict2str(cookies);
    headers['Content-Type'] = 'application/json';


    options['url']= 'https://pamyat-naroda.ru/documents/';
    options['headers'] = headers;
    options['cookies'] = cookies;
    options['followRedirect']=false;
    cook_00 = cookies[str_00];
    request.get(options,callback_03);
    
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
    cookies[str_PNSESSIONID] = cook_PNSESSIONID = cookie_01[str_PNSESSIONID];
    cookies['r'] = cook_0b = cookie_01[str_0b];
    headers = parse_file('./mu_files/mu_header3.txt');
    headers['Cookie'] = dict2str(cookies);
    headers['Content-Type'] = 'application/json';
    options['url']= 'https://pamyat-naroda.ru/documents/';
    options['headers'] = headers;
    options['cookies'] = cookies;
    request.get(options,callback_02);

  }else{
    //console.log('error');
  }
}
const req = request(options_01, callback_01);

