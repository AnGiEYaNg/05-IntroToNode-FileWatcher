
var greet = function (name) {
  console.log('Hello, ' + name);
};
var shout = function (name) {
  console.log('HELLO ' + name + '!');
}

module.exports = {
  greet: greet,
  shout: shout
};

// module.exports.greet = function (name) {
//   console.log('Hello, ' + name);
// };
// module.exports.shout = function (name) {
//   console.log('HELLO ' + name + '!');
// };

// console.log(module);