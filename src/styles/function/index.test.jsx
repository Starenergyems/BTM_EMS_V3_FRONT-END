import { expect, it } from "vitest";
import { colorHandle, hexToRgba, rgbaToHex } from "@/styles/function/index";
import { color } from "@/styles/variable/indexStyle";

it("colorHandle-顏色類型轉換成rgba，需回傳rgba的字串", () => {
  expect(colorHandle("gray", color, 1)).toBe(hexToRgba(color.gray));
});

it("hexToRgba-色碼16進制轉rgba，需回傳rgba的字串或undefined", () => {
  expect(hexToRgba("#fff")).toBe("rgba(255,255,255,1)");
  expect(hexToRgba("")).toBe(undefined);
});

it("rgbaToHex-色碼rgba轉16進制，需回傳色碼16進制字串", () => {
  expect(rgbaToHex("rgba(255,255,255,1)")).toBe("#ffffff");
});
