import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const url =
    "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US";

  const getMovieVideos = async () => {
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    // console.log("object", json);

    const filterData = json?.results?.filter(
      (video) => video?.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : json.results[0];
    // console.log("trailer", trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
