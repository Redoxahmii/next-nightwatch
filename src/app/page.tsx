import React from "react";

export default async function page() {
  const req = await fetch(
    "http://localhost:8000/api/movies/allmovies?page=2&category=popular",
  ).then((req) => req.json());
  console.log(req);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
