export const shouldForwardProp =
  <TCustomProps extends Record<string, unknown>>(customProps: ReadonlyArray<keyof TCustomProps>) =>
  (prop: string): boolean =>
    !customProps.includes(prop);
