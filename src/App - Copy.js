import logo from './logo.svg';
import './App.css';
//import { useFetchJSON } from "./hooks/useFetchJSON";
import useFetchJSON from "./hooks/useFetchWebTips";

function App() {

  let query = "Select * from Places;";
  let queryURL = "https://glacial-sea-55024.herokuapp.com/getQuery?query=" + encodeURIComponent(query);


  //https://www.dropbox.com/s/mgqmy4oaoi0dra8/dummyJSON.json?dl=1

  const [jsonData, jsonLoading] = useFetchJSON(
    "https://www.dropbox.com/s/mgqmy4oaoi0dra8/dummyJSON.json?dl=1"
  );
  
  //let dbDataLoading = true;
  // const [cardData, cardLoading] = useFetch(
  //   "https://raw.githubusercontent.com/ramirostUW/info474assignment2/main/cards.csv"
  // );
  //const [dbData, dbDataLoading] = useFetchSQL(query);

  // const chartSize = 500;
  // const margin = 20;
  // const histogramLeftPadding = 20;

  // let sortValues = function(myObject){
  //   let objectKeys = Object.keys(myObject);
  //   let sortedObject = {};
  //   objectKeys.sort(function(a,b) {
  //       return myObject[b] - myObject[a];
  //   });
  //   objectKeys.forEach(function(key){
  //       sortedObject[(key)] = myObject[key];
  //   });
  //   return sortedObject;
  // }

  // let attributeCounts = {};
  // cardData.forEach((card) => {
  //     let attributeValue = card.attribute;
  //     if(card.attribute === "")
  //     {
  //         attributeValue = "NON-MONSTER";
  //     }
  //     if(attributeCounts[attributeValue] === undefined)
  //     {
  //         attributeCounts[attributeValue] = 0;
  //     }
  //     attributeCounts[attributeValue] = attributeCounts[attributeValue] + 1; 
  // });
  // attributeCounts = sortValues(attributeCounts);

  return (
    <div className="App">
      <header className="App-header">
        <hi>JS Frontend</hi>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{queryURL}</p>
      {jsonLoading &&  <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;
