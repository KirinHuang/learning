// 'use strict'

//http://www.oschina.net/translate/use-cases-for-es6-proxies?_t=t

// proxy 在4.5.0中没有实现，使用最新的6.4.0已经默认开启
let dataStore = {  
  name: 'Billy Bob',
  age: 15
};
let handler = {  
  get(target, key, proxy) {
    const today = new Date();
    console.log(`GET request made for ${key} at ${today}`);
    return Reflect.get(target, key, proxy);
  }
}
dataStore = new Proxy(dataStore, handler);
// This will execute our handler, log the request, and set the value of the `name` variable.
const name = dataStore.name;
console.log(name);


let numericDataStore = {  
  count: 0,
  amount: 1234,
  total: 14
};
numericDataStore = new Proxy(numericDataStore, {  
  set(target, key, value, proxy) {
    if (typeof value !== 'number') {
      throw Error("Properties in numericDataStore can only be numbers");
    }
    return Reflect.set(target, key, value, proxy);
  }
});
// this will throw an error
// numericDataStore.count = "foo";
// this will set the new value as expected
// numericDataStore.count = 333;

// Define a validator that takes custom validators and returns a proxy
function createValidator(target, validator) {  
  return new Proxy(target, {
    _validator: validator,
    set(target, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        let validator = this._validator[key];
        if (!!validator(value)) {
          return Reflect.set(target, key, value, proxy);
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`);
        }
      } else {
        // prevent setting a property that isn't explicitly defined in the validator
        throw Error(`${key} is not a valid property`)
      }
    }
  });
}
// Now, just define validators for each property
const personValidators = {  
  name(val) {
    return typeof val === 'string';
  },
  age(val) {
    return typeof age === 'number' && age > 18;
  }
}
class Person {  
  constructor(name, age) {
    this.name = name;
    this.age = age;
    return createValidator(this, personValidators);
  }
}
const bill = new Person('Bill', 25);
// all of these throw an error
// bill.name = 0;  
// bill.age = 'Bill';  
// bill.age = 15;


let obj = {  
  pickyMethodOne: function(obj, str, num) { /* ... */ },
  pickyMethodTwo: function(num, obj) { /*... */ }
};
const argTypes = {  
  pickyMethodOne: ["object", "string", "number"],
  pickyMethodTwo: ["number", "object"]
};
obj = new Proxy(obj, {  
  get: function(target, key, proxy) {
    var value = target[key];
    return function(...args) {
      var checkArgs = argChecker(key, args, argTypes[key]);
      return Reflect.apply(value, target, args);
    };
  }
});
function argChecker(name, args, checkers) {  
  for (var idx = 0; idx < args.length; idx++) {
    var arg = args[idx];
    var type = checkers[idx];
    if (!arg || typeof arg !== type) {
      console.warn(`You are incorrectly implementing the signature of ${name}. Check param ${idx + 1}`);
    }
  }
}
obj.pickyMethodOne();  
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 1
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 2
// > You are incorrectly implementing the signature of pickyMethodOne. Check param 3
obj.pickyMethodTwo("wopdopadoo", {});  
// > You are incorrectly implementing the signature of pickyMethodTwo. Check param 1
// No warnings logged
obj.pickyMethodOne({}, "a little string", 123);  
obj.pickyMethodOne(123, {});


///////////////////////////////////////////////////////////////////
var api = {  
  _apiKey: '123abc456def',
  /* mock methods that use this._apiKey */
  getUsers: function(){ }, 
  getUser: function(userId){ }, 
  setUser: function(userId, config){ }
};
// Add other restricted properties to this array
const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {  
    get(target, key, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, value, proxy);
    }
});
// throws an error
console.log(api._apiKey);
// throws an error
// api._apiKey = '987654321';

////////////////////////////////////////
var api1 = {  
  _apiKey: '123abc456def',
  /* mock methods that use this._apiKey */
  getUsers: function(){ }, 
  getUser: function(userId){ }, 
  setUser: function(userId, config){ }
};
// Add other restricted properties to this array
const RESTRICTED1 = ['_apiKey'];
api1 = new Proxy(api, {  
  has(target, key) {
    return (RESTRICTED1.indexOf(key) > -1) ?
      false :
      Reflect.has(target, key);
  }
});
// these log false, and `for in` iterators will ignore _apiKey
console.log("_apiKey" in api1);
for (var key in api) {  
  if (api1.hasOwnProperty(key) && key === "_apiKey") {
    console.log("This will never be logged because the proxy obscures _apiKey...")
  }
}

////////////////////////////////////////////////////////////
let api2 = {  
  _apiKey: '123abc456def',
  getUsers: function() { /* ... */ },
  getUser: function(userId) { /* ... */ },
  setUser: function(userId, config) { /* ... */ }
};
api2 = new Proxy(api2, {  
  get: function(target, key, proxy) {
    var value = target[key];
    return function(...arguments) {
      logMethodAsync(new Date(), key);
      return Reflect.apply(value, target, arguments);
    };
  }
});
// executes apply trap in the background
api2.getUsers();
function logMethodAsync(timestamp, method) {  
  setTimeout(function() {
    console.log(`${timestamp} - Logging ${method} request asynchronously.`);
  }, 0)
}