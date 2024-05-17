"use server";

import { Movie } from "@/types/movie-types";
export interface MovieResponse {
  res?: { page: string; category: string };
  movies?: Movie[];
  error?: string;
}
export async function getAllMovies(
  page: any,
  category: any,
): Promise<MovieResponse> {
  try {
    const res = {
      page: page,
      category: category,
    };

    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!["popular", "top_rated", "upcoming"].includes(category)) {
      throw new Error();
    }
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${tmdbApiKey}&page=${page}`;
    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbData = await tmdbResponse.json();
    const movies = tmdbData.results;

    // Function to fetch trailer URLs for a movie
    const fetchTrailerUrl = async (movieId: string) => {
      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`,
      );
      const trailerData = await trailerResponse.json();
      const trailers = trailerData.results.filter(
        (video: any) => video.type === "Trailer",
      );
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        return `${trailerKey}`;
      } else {
        return "";
      }
    };

    // Generate video embed URLs and trailer URLs for each movie
    const moviesWithEmbedAndTrailerUrls = await Promise.all(
      movies.map(async (movie: any) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const trailerUrl = await fetchTrailerUrl(movie.id);
        return {
          ...movie,
          navigateLink,
          posterPath,
          trailerUrl,
        };
      }),
    );

    const MovieResponse = {
      res: res,
      movies: moviesWithEmbedAndTrailerUrls,
    };
    return MovieResponse;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch and process data." };
  }
}
