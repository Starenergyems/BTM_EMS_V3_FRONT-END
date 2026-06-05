import ScopeStyle from "./indexStyle";

function HomeBox({ children, className, title }) {
  return (
    <ScopeStyle>
      <div className={`home-box ${className}`}>
        <div className="title">{title && <h2 className="">{title}</h2>}</div>
      </div>

      <div className="mg-t-10">{children}</div>
    </ScopeStyle>
  );
}

export default HomeBox;
