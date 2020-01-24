const fs = require('fs');
var request = require('request');
var Cookie = require('request-cookies').Cookie;

const str_00 = 'bda88568a54f922fcdfc6dbf940e5d00';
const str_0b = '56105c9ab348522591eea18fbe4d080b';
const str_PNSESSIONID = 'PNSESSIONID';
var cook_00 = cook_0b = cook_PNSESSIONID = '';
military_unit = '147 сд';
start_date = '1945-5-1';
finish_date = '1945-5-31';
size_rec = 10;
from_rec = 0;

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
function callback_result(options){
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if(error){
                reject({});
            }
            if(response){
                rs = {};
                //console.log(options);
                options['method'] = 'POST';
                data = JSON.parse(body);
                total = data['hits']['total']; 
                hits = data['hits']['hits'];
                //console.log(hits[0]['_source']);
                for (i in hits){
                  //console.log(hits[i]['_source']);
                }
                console.info(' total = '+data['hits']['total']);
                rs['total'] = total;
                rs['options'] = options;
                resolve(rs);
           }
        });
    });
}

function request_03(options) {
    return new Promise((resolve, reject) => {
      
      var _cookie = {};
        request(options, function (error, response, body) {
          if(error){
              reject({});
            }
            if (response) {
            /*******************************************/
            /*******  Готовим ЧЕТВЕРТЫЙ ЗАПРОС *********/
            /*******************************************/
            headers=parse_file('./mu_files/mu_header4.txt')
            headers['Content-Type'] = 'application/json'
            headers['Origin']='https://pamyat-naroda.ru'
            headers['Referer']='https://pamyat-naroda.ru/documents/'
            bs = options['cookies'][str_00];
            bs += "=" * ((4 - bs.length % 4) % 4);
            console.log('bs = '+bs);
            bs = Buffer.from(bs, 'base64').toString('ascii');
            a_bs = bs.split('XXXXXX')[0];
            b_bs = bs.split('XXXXXX')[1].split('YYYYYY')[0];
            //console.log(bs);
            //console.log('a_bs = '+a_bs);
            //console.log('b_bs = '+b_bs);
            data_t = `{"query":{"bool":{"should":[{"bool":{"should":[{"match_phrase":{"document_type":"Боевые донесения, оперсводки"}},{"match_phrase":{"document_type":"Боевые приказы и распоряжения"}},{"match_phrase":{"document_type":"Отчеты о боевых действиях"}},{"match_phrase":{"document_type":"Переговоры"}},{"match_phrase":{"document_type":"Журналы боевых действий"}},{"match_phrase":{"document_type":"Директивы и указания"}},{"match_phrase":{"document_type":"Приказы"}},{"match_phrase":{"document_type":"Постановления"}},{"match_phrase":{"document_type":"Доклады"}},{"match_phrase":{"document_type":"Рапорты"}},{"match_phrase":{"document_type":"Разведывательные бюллетени и донесения"}},{"match_phrase":{"document_type":"Сведения"}},{"match_phrase":{"document_type":"Планы"}},{"match_phrase":{"document_type":"Планы операций"}},{"match_phrase":{"document_type":"Карты"}},{"match_phrase":{"document_type":"Схемы"}},{"match_phrase":{"document_type":"Справки"}},{"match_phrase":{"document_type":"Прочие документы"}}]}},{"bool":{"should":[{"bool":{"must":[{"range":{"date_from":{"lte":"${finish_date}"}}},{"range":{"date_to":{"gte":"${start_date}"}}}],"boost":3}},{"bool":{"must":[{"range":{"document_date_b":{"lte":"${finish_date}"}}},{"range":{"document_date_f":{"gte":"${start_date}"}}}],"boost":7}}]}},{"bool":{"should":[{"match_phrase":{"authors_list.keyword":{"query":"${military_unit}","boost":50}}},{"match":{"document_name":{"query":"${military_unit}","type":"phrase","boost":30}}},{"match":{"authors":{"query":"${military_unit}","type":"phrase","boost":20}}},{"match":{"army_unit_label.division":{"query":"${military_unit}","type":"phrase","boost":10}}},{"nested":{"path":"page_magazine","query":{"bool":{"must":[{"match":{"page_magazine.podrs":{"query":"${military_unit}","type":"phrase"}}},{"range":{"page_magazine.date_from":{"lte":"${finish_date}"}}},{"range":{"page_magazine.date_to":{"gte":"${start_date}"}}}]}},"boost":4}}]}}],"minimum_should_match":3}},"_source":["id","document_type","document_number","document_date_b","document_date_f","document_name","archive","fond","opis","delo","date_from","date_to","authors","geo_names","operation_name","secr","image_path","delo_id","deal_type","operation_name"],"size":"${size_rec}","from":"${from_rec}"}`;
            url4 = 'https://cdn.pamyat-naroda.ru/data/'+a_bs+'/'+b_bs+'/pamyat/document,map,magazine/_search';
            options['url']=url4;
            options['headers']=headers;
            options['form'] =  data_t;
            resolve(options);
          }
        })
    });
}


function request_02(options) {
  return new Promise((resolve, reject) => {
    //console.log(options);
    var _cookie = {};
    request(options, function (error, response, body) {
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
  });
}

function request_01() {
  return  new Promise((resolve, reject) => {
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

  });
}

request_01()
    .then(request_02)
    .then(request_03)
    .then(callback_result)
    .then(values => { 
      console.log(values); 
    });    

