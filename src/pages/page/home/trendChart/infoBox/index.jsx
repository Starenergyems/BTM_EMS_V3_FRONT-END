import { Flex } from "antd";

import ScopeStyle from "./indexStyle";
import Typography from "@/components/units/typography";

function InfoBox({ info, subTitle }) {
  return (
    <ScopeStyle>
      <Flex vertical align="center" justify="center" gap={4}>
        <Typography size="xl">{info}</Typography>
        <Typography size="lg">{subTitle}</Typography>
      </Flex>
    </ScopeStyle>
  );
}

export default InfoBox;
