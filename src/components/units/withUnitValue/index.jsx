import ScopeStyle from "./indexStyle";

function WithUnitValue({
  className,
  unit,
  unitTextAlign = "left",
  unitWidth = 35,
  value,
  valueTextAlign = "right",
  valueWidth,
}) {
  return (
    <ScopeStyle
      $unitTextAlign={unitTextAlign}
      $unitWidth={unitWidth}
      $valueTextAlign={valueTextAlign}
      $valueWidth={valueWidth}
      className={`styled-container-with-unit-value ${className ?? ""}`}
    >
      <span className="value">{value}</span>
      <span className="unit">{unit}</span>
    </ScopeStyle>
  );
}

export default WithUnitValue;
