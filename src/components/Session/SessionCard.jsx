/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import "./index.css";

const SessionCard = (props) => {
  const { title, formButtonTitle, titleInfoBellowButton, path, onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="session-card__container">
      <h1 className="session-car__title">{title}</h1>
      <div className="grid gap-y-10">
        <form className="session-card__form" onSubmit={handleSubmit}>
          {props.children}
          <button className="session-card__button">{formButtonTitle}</button>
        </form>

        <Link to={path} className="session-card__info-bellow-button">
          {titleInfoBellowButton}
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;

SessionCard.propTypes = {
  title: PropTypes.string.isRequired,
  formButtonTitle: PropTypes.string.isRequired,
  titleInfoBellowButton: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
