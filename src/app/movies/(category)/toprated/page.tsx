"use client";
import { useState, useEffect } from "react";
import Card from "@/components/card";
import axios from "axios";
import CardSkeleton from "@/components/card-skeleton";
import { Pagination } from "@nextui-org/react";

const TopRatedMovies = () => {
  const [topRatedMoviePage, setTopRatedMoviePage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response: any = await axios.get(`/api/movies/allmovies`, {
          params: {
            page: topRatedMoviePage,
            category: "top_rated",
          },
        });
        setMovies(response.data.movies);
      } catch (error: any) {
        setError(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [topRatedMoviePage]);

  return (
    <div className=" items-center pt-28 justify-center flex flex-col gap-10">
      <div className=" flex flex-col items-center justify-center gap-4">
        <h1 className="lg:text-5xl text-3xl tracking-tighter">
          Top Rated Movies
        </h1>
        <p className="text-sm text-white/70 text-center">
          Watch the top rated movies that even critics and viewers alike love.
        </p>
      </div>
      <Pagination
        total={500}
        showShadow
        variant="bordered"
        showControls
        color="secondary"
        page={topRatedMoviePage}
        onChange={setTopRatedMoviePage}
      />
      {loading ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mx-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <CardSkeleton key={index}></CardSkeleton>
          ))}
        </div>
      ) : error ? (
        <div className="w-full max-w-3xl text-center pt-4 mb-2">
          <p className="text-2xl tracking-tight text-danger">{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center items-center mx-10">
          {movies?.map((movie, index) => (
            <Card key={index} Data={movie}></Card>
          ))}
        </div>
      )}
      <Pagination
        total={500}
        showShadow
        variant="bordered"
        showControls
        color="secondary"
        page={topRatedMoviePage}
        onChange={setTopRatedMoviePage}
        className="mb-10"
      />
    </div>
  );
};

export default TopRatedMovies;
