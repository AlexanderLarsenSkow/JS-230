let a = [
  { b: 'c', c: 'd'},
  { z: 'h', y: 'k' },
];

console.log(a.find(object => {
  console.log(object, object.b);
  return object.b === 'c';
}));