export const shouldForwardProp =
  (customProps: string[]) =>
  (prop: string): boolean =>
    !customProps.includes(prop);
