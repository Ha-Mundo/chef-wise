import { FC } from "react";
import { Link } from "react-router-dom";
import "@/styles/NotFound.css";

const NotFound: FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        You’ve entered the void of the internet.
      </p>
      <Link to="/" className="return-link">
        Return to website
      </Link>
    </div>
  );
};

export default NotFound;
