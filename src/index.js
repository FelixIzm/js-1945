const request = require('request');
const fs = require('fs');


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

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
   console.log(response.statusCode);
  }else if(response.statusCode!=200){
	console.log("statusCode = "+response.statusCode);
	console.log(response.headers['set-cookie']);
  }else{
        console.log("error");
  }
}
request(options, callback);
//options['headers']['Cookie']=options['cookies'];
//console.log(options['headers']);
