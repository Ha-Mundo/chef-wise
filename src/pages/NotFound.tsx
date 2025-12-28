import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">
        404
      </h1>
      <p className="not-found-message">
        Looks like you've ventured into the unknown digital realm.
      </p>
      <Link to={"/"} className="return-link">
        Return to website
      </Link>
    </div>
  );
}
