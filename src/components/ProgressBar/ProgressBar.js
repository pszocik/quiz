import "./ProgressBar.css";

const ProgressBar = ({ completed }) => {
  const fillerDynamicStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="progress-bar__container">
      <div style={fillerDynamicStyles} className="progress-bar__filler">
        <span className="progress-bar__label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
