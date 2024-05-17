import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function MovieTable(props) {
  const trs = props.results.map((m) => (
    <tr key={m.id}>
      <td>{m.original_title}</td>
      <td>{m.poster_path}</td>
      <td>{m.original_language}</td>
      <td>{+m.vote_average.toFixed(2)}</td>
      <td>
        <Link to={`/students/${m.id}`}>详情</Link>
      </td>
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
