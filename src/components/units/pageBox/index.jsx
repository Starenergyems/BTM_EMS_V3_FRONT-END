import ScopeStyle from './indexStyle';

function PageBox({ children, headerTitle }) {
  return (
    <ScopeStyle>
      <div className="header">
        {headerTitle && <h2 className="header-title">{headerTitle}</h2>}
      </div>
      <div className="page-box-body">{children}</div>
    </ScopeStyle>
  );
}

export default PageBox;
