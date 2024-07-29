import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  const handlePlay = () => {
    history.push({
      pathname: "/watch",
      movie: content,
    });
  };

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <span className="title">{content.title}</span>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play" onClick={handlePlay}>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
