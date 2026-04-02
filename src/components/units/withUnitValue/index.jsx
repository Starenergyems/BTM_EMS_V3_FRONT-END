import ScopeStyle from "./indexStyle";

function WithUnitValue({
  className,
  unit,
  unitWidth = 35,
  unitTextAlign = "left",
  value,
  valueTextAlign = "right",
  valueWidth,
}) {
  return (
    <ScopeStyle
      className={`styled-container-with-unit-value ${className ?? ""}`}
      $unitWidth={unitWidth}
      $unitTextAlign={unitTextAlign}
      $valueWidth={valueWidth}
      $valueTextAlign={valueTextAlign}
    >
      <span className="value">{value}</span>
      <span className="unit">{unit}</span>
    </ScopeStyle>
  );
}

export default WithUnitValue;
