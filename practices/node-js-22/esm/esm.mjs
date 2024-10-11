
export async function getData() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
