export const getData = () => {
    return fetch('/api/data')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  