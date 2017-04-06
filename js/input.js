  function ask(question, format, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function(data) {
   data = data.toString().trim();

   if (format.test(data)) {

    callback(data);
   } else {
     stdout.write("It should match: "+ format +"\n");
     ask(question, format, callback);
   }
  });

  }

  ask("Input target as [row] [col]", /^\d\s\d/, function(input) {
  // console.log(input);
  process.exit();
  })

  // console.log(test);




function input (prompt, callback) {
  var stdin = process.stdin, stdout = process.stdout;
  stdin.resume();
  stdout.write(prompt);
  stdin.once('data', function (data) {
    var coords = data.split(' ');
    var row = coords[0];
    var col = coords[1];
    callback(row, col);
    process.exit();
  })
}