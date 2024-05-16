import React from "react";
import "./index.css";

export default function MovieTable(props) {
  const trs = props.results.map((m) => (
    <tr key={m.id}>
      <td>{m.original_title}</td>
      <td>{m.poster_path}</td>
      <td>{m.original_language}</td>
      <td>{+m.vote_average.toFixed(2)}</td>
      <td>/</td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Poster</th>
          <th>Language</th>
          <th>Rate</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{trs}</tbody>
    </table>
  );
}
