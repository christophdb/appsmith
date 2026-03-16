import { WIDGET_PADDING } from "constants/WidgetConstants";
import React, { memo } from "react";
import type { BaseWidgetProps } from "widgets/BaseWidgetHOC/withBaseWidgetHOC";
import { ResizableComponent } from "layoutSystems/common/resizer/ResizableComponent";
import { getEffectivePadding, parsePaddingToSides } from "utils/paddingUtils";

export const FixedResizableLayer = memo((props: BaseWidgetProps) => {
  if (props.resizeDisabled || props.type === "SKELETON_WIDGET") {
    return props.children;
  }

  const paddingOffset =
    "padding" in props &&
    (typeof props.padding === "number" || typeof props.padding === "string")
      ? getEffectivePadding(parsePaddingToSides(props.padding))
      : WIDGET_PADDING;

  return (
    <ResizableComponent {...props} paddingOffset={paddingOffset}>
      {props.children}
    </ResizableComponent>
  );
});
