import React from "react";
import HomeSearch from "@/components/home-search";
import Card from "@/components/card";
import { MovieList, Movie } from "@/types/movie-types";

export default async function Home() {
  // const req: MovieResponse = await getAllMovies("1", "top_rated");
  const req: MovieList = await fetch(
    "http://localhost:8000/api/movies/allmovies?page=1&category=top_rated",
    {
      cache: "no-cache",
    },
  ).then((req) => req.json());
  return (
    <>
      <div className="w-full h-[91vh] flex items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-4 animate-fade animate-delay-700 animate-duration-500">
          <h1 className="lg:text-7xl text-4xl tracking-tighter text-secondary-700">
            Welcome to Night Watch
          </h1>
          <div className="w-full max-w-3xl text-center pt-4 mb-2">
            <p className="lg:text-2xl tracking-tight text-lg">
              A free Frontend Client for watching Movies. Search for your
              favourite movies and watch them for free!
            </p>
          </div>
          <HomeSearch />
        </div>
      </div>
      <div className=" flex flex-wrap gap-5 justify-center pb-10 items-center mx-20">
        <h1 className="text-5xl font-semibold tracking-tighter mb-10">
          Movies
        </h1>
        <div className=" flex justify-center items-center flex-wrap gap-5">
          {req.movies?.map((movie: Movie) => {
            return <Card key={movie.id} Data={movie} />;
          })}
        </div>
      </div>
    </>
  );
}
