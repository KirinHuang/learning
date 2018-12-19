export const fibonacci = function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (; ;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}


// function* gen(x) {
//   var y = yield x + 2;
//   return y;
// }

// var g = gen(1);
// console.log(g.next()) // { value: 3, done: false }
// console.log(g.next(2)) // { value: 2, done: true }

var fetch = require('node-fetch');

let Api = {
  async getUserName() {
      let data = await fetch('https://api.github.com/users/github')

    return data.json()
  },

  run () {
    this.getUserName().then(result => {
      console.log('xxxxxxxx', result.bio)
    })
  }
}

Api.run()


// const hasOwnProperty = Object.prototype.hasOwnProperty;
// function hasOwn(obj, key) {
//   return obj::hasOwnProperty(key);
// }

// console.log(hasOwn({a: 1}, 'a'))