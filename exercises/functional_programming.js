/* Test Utility Function */
function assertResult(expected, actual, description) {
  if (expected === actual) {
    console.log(`✅ SUCCESS: ${description} | Expected: ${expected}, Result: ${actual}`);
  } else {
    console.error(`❌ FAIL: ${description} | Expected: ${expected}, Result: ${actual}`);
  }
}



/* Example Functions */

function add(a,b){
  return a+b;
}

function mul(a,b){
  return a*b;
}



/* Curry */

function curry(f, x){
  return function f_ret(y){return f(x,y)}
}

const add3 = curry(add, 3);
assertResult(7, add3(4), "Curry: add3(4)");
assertResult(30, curry(mul, 5)(6), "Curry: mul(5)(6)");



/* Increment */

const inc = curry(add,1);

function addf(x){
    return function add(y){return x+y;}
}

function applyf(func){
      return function(x) { return function(y) { return func(x, y); } }
}

const inc2 = addf(1);

const inc3 = applyf(add)(1); 

assertResult(6, inc(5), "Increment: inc(5) mit curry");
assertResult(6, inc2(5), "Increment: inc2(5) mit addf");
assertResult(6, inc3(5), "Increment: inc3(5) mit applyf");



/* Methodize */

function methodize(func){
  return function(y){
    return func(this.valueOf(), y);
  }
}

Number.prototype.add = methodize(add); 

assertResult(7, (3).add(4), "Methodize: (3).add(4)");



/* Demethodize */

function demethodize(func){
  return function(x,y){
    return func.call(x, y);  
  }
}

assertResult(11, demethodize(Number.prototype.add)(5, 6), "Demethodize: (5, 6)");



/* Twice */

function twice(f){
  return function(x){
    return f(x,x);
  }
}

var double = twice(add); 
assertResult(22, double(11), "Twice: double(11)");

var square = twice(mul); 
assertResult(121, square(11), "Twice: square(11)");



/* Compose */

function composeu(f, g){
  return function(x){
    return g(f(x));
  }
}

assertResult(36, composeu(double, square)(3), "Composeu: (double, square)(3)");



/* Compose B */

function composeb(f, g){
  return function(a, b, c){
    return g(f(a,b), c);
  }
}

assertResult(25, composeb(add, mul)(2, 3, 5), "Compose: (add, mul)(2, 3, 5)");



/* Once */

function once(f){
  let called = false;
  let result;

  return function(...args){

    if(!called){
      called = true;
      result = f(...args);
      return result;
    }
    throw new Error("Function can only be called once.");
  }
}

const add_once = once(add);

assertResult(7, add_once(3, 4), "Once: add_once(3, 4)");

try {
  add_once(3, 4);
} catch (e) {
  console.log(`✅ Second Call: "${e.message}"`);
}



/* Counterf */

function counterf(initialValue){

let count = initialValue;
  
  return {
    inc: function(){
      return ++count;
    },
    dec: function(){
      return --count;
    }
  };
}

const counter = counterf(10);

assertResult(11, counter.inc(), "Counter: counter.inc()");
assertResult(10, counter.dec(), "Counter: counter.dec()");



/* Revokable */

function revocable(func){
  let revoked = false;
  
  return {
    invoke: function(...args){
      if (revoked) {
        throw new Error("The function has been revoked and cannot be invoked.");
      }
      return func.apply(this, args);
    },
    revoke: function(){
      revoked = true;
    }
  };
}

const temp = revocable(add);

assertResult(7, temp.invoke(3, 4), "Revocable: Erster Aufruf (invoke)");

temp.revoke();

try {
  temp.invoke(8, 0);
} catch (e) {
  console.log(`✅ Second Call: Error expected and catched: "${e.message}"`);
}



/* Array Wrapper Object */

function vector(){

  const storage = []; 
  
  return {
    get: function(index){
      if (index >= 0 && index < storage.length) {
        return storage[index];
      }
      return undefined;
    },
    store: function(index, value){
      if (index >= 0 && index <= storage.length) {
          storage[index] = value;
       } else {
           console.error("Invalid index for store operation.");
       }
    },
    append: function(value){
      storage.push(value);
    }
    
  };
}

// --- Test ---
const my_vector = vector();

my_vector.append(7);

my_vector.store(1, 8);

assertResult(7, my_vector.get(0), "Array Wrapper: my_vector.get(0)");
assertResult(8, my_vector.get(1), "Array Wrapper: my_vector.get(1)");