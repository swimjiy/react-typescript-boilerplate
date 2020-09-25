import sayHello from './js/sayHello';
import name from './js/name';
import './css/style.css'; // Include dependency graph through entry file.

let foo;

if (true) {
  foo = 1;
} else {
  foo = 2;
}

console.log(sayHello());
console.log(foo);
