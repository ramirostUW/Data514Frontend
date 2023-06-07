// hooks.js
import { json } from "d3-fetch";
import { useState, useEffect } from "react";

const useFetchSQL = (query) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl(url) {
    const response = await json(url);
    setData(response);
    setLoading(false);
  }
  function InitializeQuery(query){
    let queryURL = "https://glacial-sea-55024.herokuapp.com/getQuery?query=" + encodeURIComponent(query);
    //let queryURL = "https://glacial-sea-55024.herokuapp.com/getSampleQuery";
    useEffect(() => {
      fetchUrl(queryURL);
    }, []);
  }
  InitializeQuery(query);

  function getNewQuery(newQuery){
    setData([]);
    setLoading(true);
    let queryURL = "https://glacial-sea-55024.herokuapp.com/getQuery?query=" + encodeURIComponent(newQuery);
    //let queryURL = "https://glacial-sea-55024.herokuapp.com/getSampleQuery";
    async function fetchUrl(url) {
      const response = await json(url);
      setData(response);
      setLoading(false);
    }
    fetchUrl(queryURL)
  }
  return [data, loading, getNewQuery];
};export { useFetchSQL };
