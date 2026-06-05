import Typography from "@/components/units/typography";

import { Flex } from "antd";
import ScopeStyle from "./indexStyle";

function InfoBox({ info, subTitle }) {
  return (
    <ScopeStyle>
      <Flex align="center" gap={4} justify="center" vertical>
        <Typography size="xl">{info}</Typography>
        <Typography size="lg">{subTitle}</Typography>
      </Flex>
    </ScopeStyle>
  );
}

export default InfoBox;
