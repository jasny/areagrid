import React, { PropsWithChildren } from "react";

const slotStyle: React.CSSProperties = { minWidth: 0 };

export type AreaSlotProps = PropsWithChildren<{
  name: string;
  className?: string;
}>;

export function AreaSlot({ name, className, children }: AreaSlotProps) {
  return (
    <div className={className} style={{ ...slotStyle, gridArea: name }}>
      {children}
    </div>
  );
}
