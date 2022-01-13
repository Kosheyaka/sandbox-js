function run() {
  const logAsync = async (...args) => console.log(...args);

  // Предпоследний по приоритету
  const onResolve = () => console.log('New Promise -> onResolve');

  const promiseBody = (resolve) => {
    console.log('New Promise -> console.log'); //Обычный приоритет
    resolve();
  };

  // Обычный приоритет
  logAsync('LogAsync').then();
  new Promise(promiseBody).then(onResolve);
  console.log('Log');

  // Низший приоритет
  setTimeout(() => console.log('setTimeout'), 0); // always lowest
}

run();
