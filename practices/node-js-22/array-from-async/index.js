async function* asyncFetchTodos() {
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

async function fetchTodo(id) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  const data = await res.json();
  return data;
}

Array.fromAsync(
  asyncFetchTodos(),
  (id) => fetchTodo(id).then(todo => console.log(todo)),
);
