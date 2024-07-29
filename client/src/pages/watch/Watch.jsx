import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import { useLocation, useHistory } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const history = useHistory(); // Initialize useHistory
  const movie = location.movie;

  const handleBack = () => {
    history.push("/"); // Navigate back to home page
  };

  return (
    <div className="watch">
      <div className="back" onClick={handleBack}>
        <ArrowBackOutlined />
        Home
      </div>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}
