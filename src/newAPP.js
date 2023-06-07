import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  let query = "Select * from Places;";
  let queryURL = "https://glacial-sea-55024.herokuapp.com/getQuery?query=" + encodeURIComponent(query);

  const fetchData = () => {
    fetch(queryURL)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Image</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.place_type}</td>
            <td>{item.place_name}</td>
            <td>{item.country_code}</td>
            <td>{item.country_name}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default App;