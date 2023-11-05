import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    <div>
      {loading ? "Loading..." : null}
      <h1>{movie.title}</h1>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <div>
        <span>Genre: </span>
        {movie.genres ? (
          <span>
            {movie.genres.map((genre, index) => (
              <span key={index}>
                {genre}{" "}
                {movie.genres.length - 1 !== index ? <span>,</span> : ""}{" "}
              </span>
            ))}
          </span>
        ) : null}

        <span> / {movie.runtime} min</span>
        <p>rating : {movie.rating}</p>
        <p> {movie.description_intro}</p>
        <a href={movie.url} target="_blank">
          영화 바로가기
        </a>
      </div>
    </div>
  );
};

export default Detail;
