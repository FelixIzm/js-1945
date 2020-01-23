const fs = require('fs');
var request = require('request');
var Cookie = require('request-cookies').Cookie;

const str_00 = 'bda88568a54f922fcdfc6dbf940e5d00';
const str_0b = '56105c9ab348522591eea18fbe4d080b';
const str_PNSESSIONID = 'PNSESSIONID';
var cook_00 = cook_0b = cook_PNSESSIONID = '';

function dict2str(dict){
	_str = '';
	for (const [key, value] of Object.entries(dict)) {
		_str+=key+"="+value+"; ";
	}
	return _str;
}

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
  maxRedirects: 0,
  method: 'GET'
};

function failureCallback(error) {
  console.log("Завершено с ошибкой " + error);
}

function request_03(options) {
    return new Promise((resolve, reject) => {
        console.log(options);
        request(options, function (error, response, body) {

        })
    })

  }


function request_02(options) {
  return new Promise((resolve, reject) => {
    //console.log(options);
    request(options, function (error, response, body) {
        var _cookie = {};
        if(error){
            reject({});
        }
        if(response){
            console.log(response.statusCode);
            var rawcookies = response.headers['set-cookie'];
            for (var i in response.headers['set-cookie']) {
                var cookie = new Cookie(rawcookies[i]);
                _cookie[cookie.key] = cookie.value;
            }
            cookies = parse_file('./mu_files/mu_cookie3.txt');
            cookies[str_00] = _cookie[str_00]
            cookies[str_0b] = cookies['r'] = options['cookies']['r'];
            cookies[str_PNSESSIONID] = cook_PNSESSIONID;
            headers = parse_file('./mu_files/mu_header3.txt');
            headers['Cookie'] = dict2str(cookies);
            headers['Content-Type'] = 'application/json';

            options['url']= 'https://pamyat-naroda.ru/documents/';
            options['headers'] = headers;
            options['cookies'] = cookies;
            options['followRedirect']=false;
            resolve(options);
        }
    })
  })
}

function request_01() {
  return new Promise((resolve, reject) => {
        var _cookie = {};
        request(options_01, function (error, response, body) {
            if(error){
                reject({});
            }
            if(response){
                console.log(response.statusCode);
                if(response.statusCode==307){
                    var rawcookies = response.headers['set-cookie'];
                    for (var i in rawcookies) {
                        var cookie = new Cookie(rawcookies[i]);
                        _cookie[cookie.key] = cookie.value;
                    }
                    /*********************************************/
                    /* Готовим ВТОРОЙ запрос с полученными куками*/
                    /*********************************************/
                    var options = {};
                    cookies = parse_file('./mu_files/mu_cookie3.txt');
                    cookies[str_00] = _cookie[str_00];
                    cookies[str_0b] = _cookie[str_0b];
                    cookies[str_PNSESSIONID] = cook_PNSESSIONID = _cookie[str_PNSESSIONID];
                    cookies['r'] = _cookie[str_0b];
                    headers = parse_file('./mu_files/mu_header3.txt');
                    headers['Cookie'] = dict2str(cookies);
                    headers['Content-Type'] = 'application/json';
                    options['url']= 'https://pamyat-naroda.ru/documents/';
                    options['headers'] = headers;
                    options['cookies'] = cookies;
                    resolve(options);
                }
            }
    });

  })
}

request_01()
    .then(request_02)
    .then(request_03);