import ScopeStyle from "./indexStyle";

function RemoveModal({ children, modalAttr }) {
  return (
    <ScopeStyle
      cancelButtonProps={{
        className: "btn-cancel",
      }}
      cancelText="取消"
      centered
      closeIcon={false}
      maskClosable={false}
      okText="確認刪除"
      styles={{
        header: { textAlign: "center" },
        footer: { textAlign: "center", direction: "rtl" },
      }}
      title="刪除提示"
      {...modalAttr}
    >
      {children || (
        <p>
          您確定要<span className="remind">刪除這個項目</span>
          嗎？此操作將無法撤銷，所有相關數據將
          <span className="remind">永久丟失且無法恢復</span>!
          請確認您真的要執行此操作。
        </p>
      )}
    </ScopeStyle>
  );
}

export default RemoveModal;
