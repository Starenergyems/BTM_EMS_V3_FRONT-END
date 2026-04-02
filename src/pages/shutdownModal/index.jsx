import toast from "react-hot-toast";
import { Flex } from "antd";
import { Icon } from "@iconify/react";
import { color } from "@/styles/variable/indexStyle";
import ScopeStyle from "./indexStyle";

function ShutdownModal({ isModalOpen, setModalOpen }) {
  return (
    <ScopeStyle
      cancelButtonProps={{
        type: "primary",
        className: "btn-cancel",
      }}
      centered
      className="modal-shutdown"
      closable={false}
      onOk={() => {
        toast.success("已成功停機");
        setModalOpen(false);
      }}
      open={isModalOpen}
      okButtonProps={{
        type: "primary",
        danger: true,
      }}
      onCancel={() => setModalOpen(false)}
      styles={{
        header: { textAlign: "center" },
        footer: {
          textAlign: "center",
          direction: "rtl",
        },
      }}
      title="緊急停機"
    >
      <Flex align="center" vertical>
        <Icon
          icon="fluent:warning-16-regular"
          color={color.alertRed}
          fontSize={60}
        />
        <p>
          是否確定緊急停機
          <br />
          非經同意者，<span className="remind">請勿隨意操作</span>系統
          <br />
          違者須承擔法律責任！
        </p>
      </Flex>
    </ScopeStyle>
  );
}

export default ShutdownModal;
