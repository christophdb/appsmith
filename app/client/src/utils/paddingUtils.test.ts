import {
  parsePaddingToSides,
  getEffectivePadding,
  type PaddingSides,
} from "./paddingUtils";

describe("parsePaddingToSides", () => {
  it("returns WIDGET_PADDING for undefined", () => {
    const result = parsePaddingToSides(undefined);

    expect(result.top).toBe(4);
    expect(result.right).toBe(4);
    expect(result.bottom).toBe(4);
    expect(result.left).toBe(4);
  });

  it("returns four equal sides for a number", () => {
    const result = parsePaddingToSides(8);

    expect(result).toEqual({ top: 8, right: 8, bottom: 8, left: 8 });
  });

  it("clamps negative number to 0", () => {
    const result = parsePaddingToSides(-2);

    expect(result).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
  });

  it("parses 1 value as all sides", () => {
    const result = parsePaddingToSides("4");

    expect(result).toEqual({ top: 4, right: 4, bottom: 4, left: 4 });
  });

  it("parses 2 values as vertical, horizontal", () => {
    const result = parsePaddingToSides("4 0");

    expect(result).toEqual({ top: 4, right: 0, bottom: 4, left: 0 });
  });

  it("parses 3 values as top, left/right, bottom", () => {
    const result = parsePaddingToSides("4 2 4");

    expect(result).toEqual({ top: 4, right: 2, bottom: 4, left: 2 });
  });

  it("parses 4 values as top, right, bottom, left", () => {
    const result = parsePaddingToSides("4 0 4 0");

    expect(result).toEqual({ top: 4, right: 0, bottom: 4, left: 0 });
  });

  it("handles empty string", () => {
    const result = parsePaddingToSides("");

    expect(result.top).toBe(4);
    expect(result.right).toBe(4);
    expect(result.bottom).toBe(4);
    expect(result.left).toBe(4);
  });

  it("clamps negative tokens to 0", () => {
    const result = parsePaddingToSides("4 -1 4 0");

    expect(result).toEqual({ top: 4, right: 0, bottom: 4, left: 0 });
  });

  it("treats invalid tokens as 0", () => {
    const result = parsePaddingToSides("4 x 4 0");

    expect(result).toEqual({ top: 4, right: 0, bottom: 4, left: 0 });
  });

  it("handles extra spaces", () => {
    const result = parsePaddingToSides("  4   0   4   0  ");

    expect(result).toEqual({ top: 4, right: 0, bottom: 4, left: 0 });
  });

  it("uses first four values when more than 4 tokens", () => {
    const result = parsePaddingToSides("1 2 3 4 5 6");

    expect(result).toEqual({ top: 1, right: 2, bottom: 3, left: 4 });
  });
});

describe("getEffectivePadding", () => {
  it("returns horizontal padding per side (left+right)/2", () => {
    const sides: PaddingSides = { top: 4, right: 0, bottom: 4, left: 0 };

    expect(getEffectivePadding(sides)).toBe(0);
  });

  it("returns same value when all sides equal", () => {
    const sides: PaddingSides = { top: 4, right: 4, bottom: 4, left: 4 };

    expect(getEffectivePadding(sides)).toBe(4);
  });

  it("returns correct value for asymmetric horizontal padding", () => {
    const sides: PaddingSides = { top: 0, right: 10, bottom: 0, left: 6 };

    expect(getEffectivePadding(sides)).toBe(8);
  });
});
