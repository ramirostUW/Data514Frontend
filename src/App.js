import logo from './imgs/load.gif';
import './App.css';
import { useFetchJSON } from "./hooks/useFetchJSON";
import QueryList from "./QueryList"
import {Routes, Route, Link} from "react-router-dom"; 

function App() {
  let queries = QueryList();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Data 514 Project Proof-of-Concept JS Frontend</h1>
        <h2>Click on one of the links below to pull up data for that question:</h2>
        <p>Note: Our API is hosted on Heroku, which sometimes takes a while to load requests. If this happens,
          the page may pull the data but then report a Network error from timing out. This is especially common in 
          the question about reply groups. We have included the static API links so the data can be viewed without needing 
          to refresh after a NetworkError.
        </p>
        {queries.map((queryOption, index) => (
          <div>
            <a href={"#/question" + index}>{queryOption.title}</a>
            <div><br /></div>
          </div>
        ))}
      </header>
    </div>
  );
}

function QueryPage(props) {

  //let query = "Select * from Places;";
  
  let queries = QueryList();

  let questionData = queries[props.queryNum];
  let questionTitle = questionData.title;

  let query = questionData.query;
  // let query = `
  //   Select country_code, count(Tweet.id) as num_tweet
  //   from Tweet inner join Places on Tweet.place_id = Places.id
  //   group by Places.country_code
  //   order by count(Tweet.id) DESC
  //   Limit 1;
  //   `
  let queryURL = "https://glacial-sea-55024.herokuapp.com/getQuery?query=" + encodeURIComponent(query.trim());

  const [jsonData, jsonLoading] = useFetchJSON(
    queryURL
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data 514 Project Proof-of-Concept JS Frontend</h1>
        <h2>{questionTitle}</h2>
        <h3>{query}</h3>
        <a href={queryURL}>API URL</a>
        
        <br />
      {jsonLoading &&  <img src={logo} alt="loading animation" />}
      {!jsonLoading &&  <DataTable data={jsonData}/>}
      </header>
    </div>
  );
}

function DataTable(props){
  let data = props.data;
  return(
    <center><tbody>
        <tr>
        {Object.keys(data[0]).map((item, index) => (<th>{item}</th>))}
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.keys(item).map((key, index) => (<td>{item[key]}</td>))}
          </tr>
        ))}
    </tbody></center>
  )
}

//<Route path="/" element={ <QueryPage queryNum={1}/>} />
function myRouter(){
  let queries = QueryList();

  return(
    <Routes>
					<Route path="/" element={ <App/>} />
          {queries.map((queryOption, index) => (
            <Route path={"question" + index} 
              element={
                <QueryPage queryNum={index}/>
              }
            />
          ))}
					<Route path="*"
								 element={
									 <div className="App">
										 <h1>404 Error</h1>
										 <p>There's nothing here!</p>
										 <Link to="/">Return to home page</Link>
									 </div>
								 }
					/>
    </Routes>
  )
}

export default myRouter;