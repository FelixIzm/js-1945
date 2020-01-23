function resolveAfter2Seconds(par1) {
  return new Promise(resolve => {
      resolve(par1);
  });
}

var d = 11;
async function f1(sd) {
  var x = await resolveAfter2Seconds(sd);
  return(x); // 10
}
f1(d).then(response => { 
      console.log(response);
    });

/*
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 10000, "foo");
}); 

Promise.all([p3, p2, p1]).then(values => { 
  console.log(values); 
});
*/
