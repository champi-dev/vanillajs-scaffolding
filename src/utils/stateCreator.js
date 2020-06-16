import mockData from '../mock_data.json'

function stateCreator() {
  let data = JSON.parse(localStorage.getItem('data')) || mockData

  const setData = (value) => {
    data = value
    localStorage.setItem('data', JSON.stringify(value))
  }

  return {
    data: () => data,
    setData
  }
}

export default stateCreator