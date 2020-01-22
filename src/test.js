function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
      resolve(x);
  });
}

async function f1(sd) {
  var x = await resolveAfter2Seconds(sd);
  console.log(x); // 10
}
f1(10);
