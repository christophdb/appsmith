import { WIDGET_PADDING } from "constants/WidgetConstants";

export interface PaddingSides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Parses padding (number or CSS-style space-separated string) into four sides.
 * CSS shorthand: 1 value = all, 2 = vertical horizontal, 3 = top left/right bottom, 4 = top right bottom left.
 * Invalid or missing input returns WIDGET_PADDING on all sides. Each side is clamped to >= 0.
 */
export function parsePaddingToSides(
  padding: number | string | undefined,
): PaddingSides {
  const defaultSides: PaddingSides = {
    top: WIDGET_PADDING,
    right: WIDGET_PADDING,
    bottom: WIDGET_PADDING,
    left: WIDGET_PADDING,
  };

  if (padding === undefined || padding === null) {
    return defaultSides;
  }

  if (typeof padding === "number") {
    const n = Math.max(0, padding);

    return { top: n, right: n, bottom: n, left: n };
  }

  const str = String(padding).trim();

  if (str === "") {
    return defaultSides;
  }

  const tokens = str.split(/\s+/).map((s) => Math.max(0, parseFloat(s) || 0));

  if (tokens.length === 0) {
    return defaultSides;
  }

  const [t, r, b, l] = (() => {
    if (tokens.length === 1) {
      const v = tokens[0];

      return [v, v, v, v];
    }

    if (tokens.length === 2) {
      const [v, h] = tokens;

      return [v, h, v, h];
    }

    if (tokens.length === 3) {
      const [top, hor, bottom] = tokens;

      return [top, hor, bottom, hor];
    }

    return tokens.length >= 4
      ? [tokens[0], tokens[1], tokens[2], tokens[3]]
      : [tokens[0], tokens[0], tokens[0], tokens[0]];
  })();

  return {
    top: Math.max(0, t),
    right: Math.max(0, r),
    bottom: Math.max(0, b),
    left: Math.max(0, l),
  };
}

/**
 * Returns the horizontal padding per side – (left + right) / 2.
 * Used by the snap-grid width calculation and resize logic, which both need
 * the effective horizontal padding expressed as a single symmetric value.
 */
export function getEffectivePadding(sides: PaddingSides): number {
  return (sides.left + sides.right) / 2;
}
