import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import ScopeStyle from "./indexStyle";
import { color } from "@/styles/variable/indexStyle";

function ShutdownModal({ isModalOpen, setModalOpen }) {
  return (
    <ScopeStyle
      cancelButtonProps={{
        className: "btn-cancel",
        type: "primary",
      }}
      centered
      className="modal-shutdown"
      closable={false}
      okButtonProps={{
        danger: true,
        type: "primary",
      }}
      onCancel={() => setModalOpen(false)}
      onOk={() => {
        toast.success("已成功停機");
        setModalOpen(false);
      }}
      open={isModalOpen}
      styles={{
        footer: {
          direction: "rtl",
          textAlign: "center",
        },
        header: { textAlign: "center" },
      }}
      title="緊急停機"
    >
      <Flex align="center" vertical>
        <Icon
          color={color.alertRed}
          fontSize={60}
          icon="fluent:warning-16-regular"
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
