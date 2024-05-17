import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("movieId");
    console.log("page LOG:", page);

    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!page) {
      return NextResponse.json({ error: "Invalid movie ID" });
    }

    const tmdbUrl = `https://api.themoviedb.org/3/movie/${page}?api_key=${tmdbApiKey}`;
    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbData = await tmdbResponse.json();
    // Ensure tmdbData has the expected structure
    if (!tmdbData || tmdbData.success === false) {
      return NextResponse.json({ error: "Movie not found" });
    }

    const {
      title,
      overview,
      poster_path,
      release_date,
      status,
      tagline,
      vote_average,
    } = tmdbData; // Use tmdbData directly instead of tmdbData.results

    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const posterPath = `${baseUrl}${poster_path}`;

    const embedUrl = `https://vidsrc.to/embed/movie/${page}`;
    const imageExists = await checkImageExists(posterPath);

    const MovieData = {
      title,
      overview,
      vote_average,
      posterPath: imageExists ? posterPath : "", // Set an empty path if the image doesn't exist
      release_date,
      status,
      tagline,
      embedUrl,
    };

    const vidsrcResponse = await axios
      .head(embedUrl)
      .catch(() => ({ status: 404 }));
    if (vidsrcResponse.status !== 200) {
      return NextResponse.json({
        error: "Movie or TV show not found on VidSrc.",
      });
    }

    return NextResponse.json(MovieData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch and process data." });
  }
}

async function checkImageExists(url: string) {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false; // Image doesn't exist
  }
}
