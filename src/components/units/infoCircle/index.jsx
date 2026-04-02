import ScopeStyle from "./indexStyle";

function InfoCircle({ text, textColor, title, className }) {
  return (
    <ScopeStyle
      $textColor={textColor}
      className={`styled-container-info-circle ${className ?? ""}`}
    >
      <div className="container">
        <div className="circle">
          <span className="text">{text}</span>
        </div>
        <span className="title">{title}</span>
      </div>
    </ScopeStyle>
  );
}

export default InfoCircle;
