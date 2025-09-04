let count = 0;

walk(body, node => {
  if (node.nodeName === 'P') {
    count += 1;
    console.log(count);
  }
});

console.log(`Final Count is ${count}!`);