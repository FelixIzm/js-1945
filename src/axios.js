    const fs = require('fs');
    const axios = require("axios");
    const url = "https://jsonplaceholder.typicode.com/posts/1";

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
    
const getData = async (url, options )=> {
//  try {
    options['url'] = url;
    const response = await axios(options);
    const data = response;
    return(data);
  /*
  } 
  catch (error) {
    console.log(error.response.status);
  }
  */
};


getData(url,options_01)
    .then(response => { 
      console.log(response.headers['set-cookie']);
    })
    .catch(error => {
      console.log(error.response.status);
      console.log(error.response.headers);
    });

