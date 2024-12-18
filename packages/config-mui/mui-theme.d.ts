declare module '@mui/material/styles/createPalette' {
  interface PaletteColor extends ColorPartial {}

  interface TypeText {
    muted: string;
    white: string;
    dark: string;
    grey: string;
    primaryLight: string;
  }

  interface TypeBackground {
    default: string;
    paper: string;
    surface: string;
    surface2: string;
    header: string;
    disabled: string;
    white: string;
    collapse: string;
  }

  interface Palette {
    gradients: {
      menuHover: string;
      body: string;
      default: string;
      hover: string;
      active: string;
    };
    shadow: {
      default: string;
      gray: string;
      card: string;
    };
    border: {
      paper: string;
      white: string;
      grey: string;
    };
    buttons: {
      contained: TypeAction & { default: string };
      white: TypeAction & { default: string };
      switch: TypeAction & { default: string };
      outlined: TypeAction & { default: string };
    };
    other: {
      standardInputLine: string;
    };
  }

  interface PaletteOptions {
    gradients: {
      menuHover: string;
      body: string;
      default: string;
      hover: string;
      active: string;
    };
    shadow: {
      default: string;
      gray: string;
      card: string;
    };
  }
}

interface TypographyCustomVariants {
  display1: React.CSSProperties;
  subtitle: React.CSSProperties;
  subheader1: React.CSSProperties;
  subheader2: React.CSSProperties;
  description: React.CSSProperties;
  buttonL: React.CSSProperties;
  buttonM: React.CSSProperties;
  buttonS: React.CSSProperties;
  helperText: React.CSSProperties;
  tooltip: React.CSSProperties;
  main21: React.CSSProperties;
  secondary21: React.CSSProperties;
  main16: React.CSSProperties;
  secondary16: React.CSSProperties;
  main14: React.CSSProperties;
  secondary14: React.CSSProperties;
  main12: React.CSSProperties;
  secondary12: React.CSSProperties;
  number: React.CSSProperties;
  numberS: React.CSSProperties;
  numberM: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends TypographyCustomVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends TypographyCustomVariants {}

  interface BreakpointOverrides {
    xsm: true;
    xxl: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true;
    subtitle: true;
    subheader1: true;
    subheader2: true;
    description: true;
    buttonL: true;
    buttonM: true;
    buttonS: true;
    number: true;
    numberS: true;
    numberM: true;
    helperText: true;
    tooltip: true;
    main21: true;
    secondary21: true;
    main16: true;
    secondary16: true;
    main14: true;
    secondary14: true;
    main12: true;
    secondary12: true;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    overline: false;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    white: true;
    switch: true;
  }
}
