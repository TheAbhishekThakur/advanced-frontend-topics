// Call an API to get list and then fetch details data - example 2

import { useEffect, useState } from "react";
import "./styles.css";
const API_URL = "https://swapi.dev/api/people";

export default function App() {
  const [list, setList] = useState([]);

  const callAPi = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();

    const results = json.results;

    const finaldata = [...list];

    for (let i = 0; i < results.length; i++) {
      const obj = {};
      obj.name = results[i].name;

      if (results[i].films.length) {
        const films = await callFilmsApi(results[i].films);
        obj.films = films;
      }
      if (results[i].vehicles.length) {
        const vec = await callVehiclesApi(results[i].vehicles);
        obj.vec = vec;
      }
      finaldata.push(obj);
      setList(finaldata);
    }
  };

  useEffect(() => {
    callAPi();
  }, []);

  const callFilmsApi = async (films) => {
    const arr = [];

    for (let i = 0; i < films.length; i++) {
      const res = await fetch(films[i]);
      const json = await res.json();
      arr.push(json);
    }
    return arr;
  };

  const callVehiclesApi = async (vehicles) => {
    const arr = [];
    for (let i = 0; i < vehicles.length; i++) {
      const res = await fetch(vehicles[i]);
      const json = await res.json();
      arr.push(json);
    }
    return arr;
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {list && list.length
            ? list.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.name}{" "}
                    {item.films?.map((film, i) => (
                      <span key={i}>{film.title}</span>
                    ))}
                    {item.vec?.map((vechle, idx) => (
                      <span key={idx}>{vechle.name}</span>
                    ))}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
