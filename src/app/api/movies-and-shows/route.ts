import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json(
        { error: "Please enter a search term" },
        { status: 400 },
      );
    }

    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?include_adult=true&language=en-US&api_key=${tmdbApiKey}&query=${query}`;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&api_key=${tmdbApiKey}&query=${query}`;

    const [tvResponse, movieResponse] = await Promise.all([
      fetch(tvUrl),
      fetch(movieUrl),
    ]);

    const movies = (await movieResponse.json()).results;
    const tvShows = (await tvResponse.json()).results;
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Function to fetch trailer URL for a movie
    const fetchTrailerUrl = async (movieId: string) => {
      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`,
      );
      const trailers = (await trailerResponse.json()).results.filter(
        (video: any) => video.type === "Trailer",
      );
      return trailers.length > 0 ? trailers[0].key : "";
    };

    const fetchTrailerUrlTV = async (showId: string) => {
      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${tmdbApiKey}`,
      );
      const trailers = (await trailerResponse.json()).results.filter(
        (video: any) => video.type === "Trailer",
      );
      return trailers.length > 0 ? trailers[0].key : "";
    };

    const moviesWithEmbedUrls = await Promise.all(
      movies.map(async (movie: any) => {
        const navigateLink = `/movies/${movie.id}`;
        const posterPath = `${baseUrl}${movie.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/movie/${movie.id}`;
        const trailerUrl = await fetchTrailerUrl(movie.id);

        return {
          ...movie,
          navigateLink,
          posterPath: posterPath || "",
          embedUrl,
          trailerUrl,
        };
      }),
    );

    const tvShowsWithEmbedUrls = await Promise.all(
      tvShows.map(async (show: any) => {
        const navigateLink = `/tvshows/${show.id}/1/1`;
        const posterPath = `${baseUrl}${show.poster_path}`;
        const embedUrl = `https://vidsrc.to/embed/tv/${show.id}`;
        const trailerUrl = await fetchTrailerUrlTV(show.id);

        return {
          ...show,
          navigateLink,
          posterPath: posterPath || "",
          embedUrl,
          trailerUrl,
        };
      }),
    );

    return NextResponse.json({
      tvShows: tvShowsWithEmbedUrls,
      movies: moviesWithEmbedUrls,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie. Try again later." },
      { status: 500 },
    );
  }
};
