import { createTheme } from '@mui/material'

const theme = createTheme();
const {
  typography: { pxToRem },
} = theme;

const FONT_ALDRICH = 'Aldrich, sans-serif';
const FONT_MONTSERRAT = 'Montserrat, sans-serif';



export const getDesignTokens = (mode: 'light' | 'dark') => {
  const getColor = (lightColor: string, darkColor: string) =>
    mode === 'dark' ? darkColor : lightColor;
  const {
    breakpoints,
    typography: { pxToRem },
  } = theme;
  return {
    breakpoints: {
      keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
      values: { xs: 0, xsm: 640, sm: 760, md: 960, lg: 1280, xl: 1575, xxl: 1800 },
    },
    palette: {
      mode,
      primary: {
        main: getColor('#0D2D62', '#031B44'),
        light: getColor('#1111A8', '#2E74FF'),
        dark: getColor('#292E41', '#D2D4DC'),
        contrast: getColor('#FFFFFF', '#0F121D'),
      },
      secondary: {
        main: getColor('#FF607B', '#F48FB1'),
        light: getColor('#FF607B', '#F6A5C0'),
        dark: getColor('#B34356', '#AA647B'),
      },
      error: {
        main: getColor('#FC0000', '#FF0D0D'),
        light: getColor('#D26666', '#E57373'),
        dark: getColor('#BC0000', '#D32F2F'),
        '100': getColor('#4F1919', '#FBB4AF'), // for alert text
        '200': getColor('#F9EBEB', 'rgba(255, 13, 13, 0.25)'), // for alert background
      },
      warning: {
        main: getColor('#F89F1A', '#FFBB6B'),
        light: getColor('#FFCE00', '#FFB74D'),
        dark: getColor('#C67F15', '#F57C00'),
        '100': getColor('#63400A', '#FFDCA8'), // for alert text
        '200': getColor('#FEF5E8', 'rgba(255, 187, 107, 0.70)'), // for alert background
      },
      info: {
        main: getColor('#0062D2', '#2E74FF'),
        light: getColor('#0062D2', '#4FC3F7'),
        dark: getColor('#002754', '#0288D1'),
        '100': getColor('#002754', '#FFFFFF'), // for alert text
        '200': getColor('#E5EFFB', 'rgba(61, 91, 142, 0.40)'), // for alert background
      },
      success: {
        main: getColor('#06AF88', '#66BB6A'),
        light: getColor('#90FF95', '#90FF95'),
        dark: getColor('#318435', '#388E3C'),
        '100': getColor('#1C4B1E', '#C2E4C3'), // for alert text
        '200': getColor('#ECF8ED', '#0A130B'), // for alert background
      },
      text: {
        primary: getColor('#08074D', '#F1F1F3'),
        primaryLight: getColor('#1111A8', '#F1F1F3'),
        secondary: getColor('#000000', '#FFFFFF'),
        disabled: getColor('#D2D4DC', '#62677B'),
        muted: getColor('#C3C3CC', '#FFFFFF'),
        white: getColor('#ffffff', '#FFFFFF'),
        dark: getColor('#000000', '#fff'),
        grey: '#DCDCDC',
        highlight: getColor('#383D51', '#C9B3F9'),
        red: 'red',
      },
      background: {
        default: getColor('#F1F1F3', '#0B172B'),
        paper: getColor('#FFFFFF', '#152B4F'),
        surface: getColor('#DCDCDC', '#0D2D62'),
        surface2: getColor('#F5F5F5', '#152B4F'),
        header: getColor('#0D2D62', '#152B4F'),
        disabled: getColor('#EAEBEF', '#EBEBEF14'),
        white: getColor('#FFFFFF', '#3D5B8E'),
        collapse: getColor('#F5F5F5', '#102342'),
      },
      border: {
        paper: getColor('#0D2D62', '#0D1420'),
        white: getColor('#FFFFFF', '#42536F'),
        grey: getColor('#C3C3CC', '#42536F'),
      },
      buttons: {
        white: {
          default: getColor('#F5F5F5', '#3D5B8E'),
          hover: getColor('#FFFFFF', '#1F488C'),
          active: getColor('#FFFFFF', '#1F488C'),
          disabled: getColor('#F5F5F5', '#42536F'),
        },
        contained: {
          default: getColor(
            'radial-gradient(50% 50% at 50% 50%, #29549C 0%, #0D2D62 100%)',
            'radial-gradient(50% 50% at 50% 50%, #031B44 0%, #1F488C 99.99%)'
          ),
          hover: getColor(
            'radial-gradient(50% 50% at 50% 50%, #216EEC 0%, #0E4092 96%, #0E3E8E 100%)',
            'radial-gradient(50% 50% at 50% 50%, #031B44 0%, #2E66C2 99.99%)'
          ),
          active: getColor(
            'radial-gradient(50% 50% at 50% 50%, #4086FA 0%, #0A429F 100%)',
            'radial-gradient(50% 50% at 50% 50%, #031B44 0%, #2E66C2 99.99%)'
          ),
          disabled: getColor('#19335F', '#3D5B8E'),
        },
        outlined: {
          default: getColor(
            'radial-gradient(50% 50% at 50% 50%, #29549C 0%, #0D2D62 100%)',
            '#F1F1F3'
          ),
          hover: getColor(
            'radial-gradient(50% 50% at 50% 50%, #216EEC 0%, #0E4092 96%, #0E3E8E 100%)',
            '#F1F1F3'
          ),
          active: getColor(
            'radial-gradient(50% 50% at 50% 50%, #4086FA 0%, #0A429F 100%)',
            '#F1F1F3'
          ),
          disabled: getColor('#19335F', '#3D5B8E'),
        },
      },
      divider: getColor('#EAEBEF', '#EBEBEF14'),
      action: {
        active: getColor('#8E92A3', '#EBEBEF8F'),
        hover: getColor('#F1F1F3', '#EBEBEF14'),
        selected: getColor('#EAEBEF', '#EBEBEF29'),
        disabled: getColor('#BBBECA', '#EBEBEF4D'),
        disabledBackground: getColor('#EAEBEF', '#EBEBEF1F'),
        focus: getColor('#F1F1F3', '#EBEBEF1F'),
      },
      other: {
        standardInputLine: getColor('#383D511F', '#EBEBEF6B'),
      },
      gradients: {
        menuHover: getColor(
          'radial-gradient(50% 50% at 50% 50%, #0B51C5 0%, #0D2D62 100%)',
          'radial-gradient(50% 50% at 50% 50%, #1F488C 0%, #152B4F 100%)'
        ),
        body: getColor(
          'linear-gradient(252deg, #69bffd -59.48%, #fff 100%)',
          'linear-gradient(252deg, #09090B 0%, #0D2D62 100%)'
        ),
        default: 'radial-gradient(50% 50% at 50% 50%, #29549C 0%, #0D2D62 100%)',
        hover: 'radial-gradient(50% 50% at 50% 50%, #216EEC 0%, #0E4092 96%, #0E3E8E 100%)',
        active: 'radial-gradient(50% 50% at 50% 50%, #4086FA 0%, #0A429F 100%)',
      },
      shadow: {
        default: getColor(
          '0px 2px 3px 2px rgba(13, 45, 98, 0.25)',
          '0px 2px 3px 2px rgba(0, 0, 0, 0.25)'
        ),
        gray: '0px 2px 3px 2px rgba(0, 0, 0, 0.25)',
        card: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
    spacing: 4,
    typography: {
      fontFamily: [FONT_MONTSERRAT, FONT_ALDRICH].join(','),
      h5: undefined,
      h6: undefined,
      subtitle1: undefined,
      subtitle2: undefined,
      body1: undefined,
      body2: undefined,
      button: undefined,
      overline: undefined,
      display1: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 400,
        letterSpacing: pxToRem(0.25),
        lineHeight: '125%',
        fontSize: pxToRem(24),
      },
      h1: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 400,
        letterSpacing: pxToRem(0.25),
        lineHeight: '123.5%',
        fontSize: pxToRem(28),

        [breakpoints.down('sm')]: {
          lineHeight: '111%',
          fontSize: pxToRem(20),
        },
      },
      h2: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 400,
        letterSpacing: 'unset',
        lineHeight: pxToRem(24),
        fontSize: pxToRem(20),

        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(28),
          fontSize: pxToRem(18),
        },
      },
      h3: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: '150%',
        fontSize: pxToRem(16),

        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(20),
          fontSize: pxToRem(14),
        },
      },
      h4: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      subtitle: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),

        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(18),
          fontSize: pxToRem(12),
        },
      },
      number: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(30),
        fontSize: pxToRem(18),
      },
      numberS: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 700,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(18),
          fontSize: pxToRem(12),
        },
      },
      numberM: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 700,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(20),
        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(24),
          fontSize: pxToRem(18),
        },
      },
      subheader1: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      subheader2: {
        fontFamily: FONT_ALDRICH,
        fontWeight: 500,
        letterSpacing: pxToRem(0.1),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      description: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: '143%',
        fontSize: pxToRem(14),
      },
      caption: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      buttonL: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.46),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      buttonM: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        lineHeight: pxToRem(24),
        fontSize: pxToRem(14),
        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(18),
          fontSize: pxToRem(12),
        },
      },
      buttonS: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.46),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
        [breakpoints.down('sm')]: {
          lineHeight: pxToRem(18),
          fontSize: pxToRem(12),
        },
      },
      helperText: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.4),
        lineHeight: pxToRem(12),
        fontSize: pxToRem(10),
      },
      tooltip: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      main21: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 800,
        lineHeight: '133.4%',
        fontSize: pxToRem(21),
      },
      secondary21: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        lineHeight: '133.4%',
        fontSize: pxToRem(21),
      },
      main16: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      secondary16: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      main14: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      secondary14: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      main12: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.1),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      secondary12: {
        fontFamily: FONT_MONTSERRAT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.1),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
    },
  } as ThemeOptions;
};

export function getThemedComponents(theme: Theme) {
  return {
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            transform: 'unset',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            borderColor: 'transparent',
            background: 'transparent',
            boxShadow: 'none',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
          sizeLarge: {
            ...theme.typography.buttonL,
            padding: '10px 24px',
          },
          sizeMedium: {
            ...theme.typography.buttonM,
            padding: '6px 12px',
          },
          sizeSmall: {
            ...theme.typography.buttonS,
            padding: '3px 16px',
            height: pxToRem(26),
          },
          outlined: {
            color: theme.palette.primary.light,
          },
        },
        variants: [
          {
            props: { variant: 'text' },
            style: {
              color: theme.palette.text.primary,
            },
          },
          {
            props: { variant: 'contained' },
            style: {
              color: theme.palette.text.white,
              background: theme.palette.buttons.contained.default,
              border: 'none',
              boxShadow: theme.palette.shadow.default,

              '&:hover, &.Mui-focusVisible': {
                background: theme.palette.buttons.contained.hover,
                boxShadow: theme.palette.shadow.default,
              },

              '&:active, &.Mui-focusVisible': {
                background: theme.palette.buttons.contained.active,
                boxShadow: theme.palette.shadow.default,
              },

              '&:disabled, &.Mui-focusVisible': {
                background: theme.palette.buttons.contained.disabled,
                boxShadow: theme.palette.shadow.default,
              },
            },
          },
          {
            props: { variant: 'white' },
            style: {
              background: theme.palette.buttons.white.default,
              border: theme.palette.mode === 'light' ? '1px solid ' : 'none',
              borderColor: '#F5F5F5',
              ...(theme.palette.mode === 'light' && { boxShadow: theme.palette.shadow.gray }),
              color: theme.palette.text.dark,

              '&:hover, &.Mui-focusVisible': {
                background: theme.palette.buttons.white.hover,
                borderColor: '#C3C3CC',
                ...(theme.palette.mode === 'light' && { boxShadow: theme.palette.shadow.gray }),
              },

              '&:active, &.Mui-focusVisible': {
                background: theme.palette.buttons.white.active,
                ...(theme.palette.mode === 'light' && { boxShadow: theme.palette.shadow.gray }),
                borderColor: ' #0D2D62',
              },

              '&:disabled, &.Mui-focusVisible': {
                background: theme.palette.buttons.white.disabled,
                ...(theme.palette.mode === 'light' && { boxShadow: theme.palette.shadow.gray }),
                color: '#C3C3CC',
              },
            },
          },
          {
            props: { variant: 'switch' },
            style: {
              background: '#0D2D62',
              border: '1px solid #FFFFFF',
              color: theme.palette.text.white,

              '&:hover, &.Mui-focusVisible': {
                background: '#0B3D90',
                border: '1px solid #C3C3CC',
              },

              '&:active, &.Mui-focusVisible': {
                background: '#0E4092',
                border: '1px solid #0D2D62',
              },

              '&:disabled, &.Mui-focusVisible': {
                background: '#2A3E60',
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: theme.palette.buttons.outlined.default,
              borderColor: theme.palette.buttons.outlined.default,

              '&:hover, &.Mui-focusVisible': {
                color: theme.palette.background.default,
                borderColor: theme.palette.buttons.outlined.hover,
                background: theme.palette.buttons.outlined.hover,
              },

              '&:active, &.Mui-focusVisible': {
                color: theme.palette.background.default,
                borderColor: theme.palette.buttons.outlined.active,
                background: theme.palette.buttons.outlined.active,
              },

              '&:disabled, &.Mui-focusVisible': {
                color: theme.palette.background.default,
                borderColor: theme.palette.buttons.outlined.disabled,
                background: theme.palette.buttons.outlined.disabled,
              },
            },
          },
        ],
      },
      MuiTypography: {
        root: {
          color: theme.palette.text.dark,
        },
        defaultProps: {
          variant: 'description',
          variantMapping: {
            display1: 'h1',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            subtitle: 'p',
            subheader1: 'p',
            subheader2: 'p',
            caption: 'p',
            description: 'p',
            buttonL: 'p',
            buttonM: 'p',
            buttonS: 'p',
            main12: 'p',
            main14: 'p',
            main16: 'p',
            main21: 'p',
            secondary12: 'p',
            secondary14: 'p',
            secondary16: 'p',
            secondary21: 'p',
            helperText: 'span',
            tooltip: 'span',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          variant: 'description',
        },
      },
      MuiMenu: {
        defaultProps: {
          PaperProps: {
            elevation: 0,
            variant: 'outlined',
            style: {
              minWidth: 240,
              marginTop: '4px',
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            '.MuiMenuItem-root+.MuiDivider-root, .MuiDivider-root': {
              marginTop: '4px',
              marginBottom: '4px',
            },
          },
          padding: {
            paddingTop: '4px',
            paddingBottom: '4px',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            ...theme.typography.subheader1,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.light,
            minWidth: 'unset !important',
            marginRight: '12px',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: 0,
            marginBottom: 0,
            background: '#C3C3CC',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            color: theme.palette.text.dark,
            ...(theme.palette.mode === 'light'
              ? {
                  border: `1px solid`,
                  borderColor: theme.palette.border.paper,
                }
              : {
                  border: 'none',
                  boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                }),
          },
        },
        variants: [
          {
            props: { variant: 'outlined' },
            style: {
              ...(theme.palette.mode === 'light'
                ? {
                    border: `1px solid`,
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.palette.background.paper,
                  }
                : {
                    border: 'none',
                    boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  }),
            },
          },
          {
            props: { variant: 'elevation' },
            style: {
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
              ...(theme.palette.mode === 'dark' ? { backgroundImage: 'none' } : {}),
            },
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingBottom: '39px',
            [theme.breakpoints.up('xs')]: {
              paddingLeft: '8px',
              paddingRight: '8px',
            },
            [theme.breakpoints.up('xsm')]: {
              paddingLeft: '20px',
              paddingRight: '20px',
            },
            [theme.breakpoints.up('sm')]: {
              paddingLeft: '48px',
              paddingRight: '48px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '96px',
              paddingRight: '96px',
            },
            [theme.breakpoints.up('lg')]: {
              paddingLeft: '20px',
              paddingRight: '20px',
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: 'unset',
              paddingLeft: '96px',
              paddingRight: '96px',
            },
            [theme.breakpoints.up('xxl')]: {
              paddingLeft: 0,
              paddingRight: 0,
              maxWidth: '1440px',
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            height: 20 + 6 * 2,
            width: 34 + 6 * 2,
            padding: 6,
          },
          switchBase: {
            padding: 8,
            '&.Mui-checked': {
              transform: 'translateX(14px)',
              '& + .MuiSwitch-track': {
                background: theme.palette.gradients.default,
                opacity: 1,
              },
            },
            '&.Mui-disabled, &.Mui-disabled+.MuiSwitch-track': {
              opacity: theme.palette.mode === 'dark' ? 0.3 : 0.7,
            },
          },
          thumb: {
            color: theme.palette.common.white,
            borderRadius: '4px',
            width: '16px',
            height: '16px',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.12)',
          },
          track: {
            opacity: 1,
            background:
              theme.palette.mode === 'light'
                ? theme.palette.background.surface
                : theme.palette.gradients.body,
            borderRadius: '4px',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
            '&.Mui-checked': {
              color: theme.palette.text.primary,
            },
          },
        },
      },
      MuiIcon: {
        variants: [
          {
            props: { fontSize: 'large' },
            style: {
              fontSize: pxToRem(48),
            },
          },
        ],
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.divider,
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            border: 'none',
            color: theme.palette.text.dark,
            ...theme.typography.subtitle,
            alignItems: 'flex-start',
            '.MuiAlert-message': {
              padding: 0,
              paddingTop: '2px',
              paddingBottom: '2px',
            },
            '.MuiAlert-icon': {
              padding: 0,
              opacity: 1,
              '.MuiSvgIcon-root': {
                fontSize: pxToRem(20),
              },
            },
            a: {
              ...theme.typography.subtitle,
              fontWeight: 500,
              textDecoration: 'underline',
              color: theme.palette.text.dark,
              '&:hover': {
                textDecoration: 'none',
              },
            },
            '.MuiButton-text': {
              ...theme.typography.subtitle,
              fontWeight: 500,
              textDecoration: 'underline',
              padding: 0,
              margin: 0,
              minWidth: 'unset',
              '&:hover': {
                textDecoration: 'none',
                background: 'transparent',
              },
            },
          },
        },
        defaultProps: {
          iconMapping: {
            error: (
              <SvgIcon color="error">
                <ExclamationIcon />
              </SvgIcon>
            ),
            info: (
              <SvgIcon color="info">
                <InformationCircleIcon />
              </SvgIcon>
            ),
            success: (
              <SvgIcon color="success">
                <CheckCircleIcon />
              </SvgIcon>
            ),
            warning: (
              <SvgIcon color="warning">
                <ExclamationCircleIcon />
              </SvgIcon>
            ),
          },
        },
        variants: [
          {
            props: { severity: 'error' },
            style: {
              background: theme.palette.error['200'],
            },
          },
          {
            props: { severity: 'info' },
            style: {
              background: theme.palette.info['200'],
            },
          },
          {
            props: { severity: 'success' },
            style: {
              background: theme.palette.success['200'],
            },
          },
          {
            props: { severity: 'warning' },
            style: {
              background: theme.palette.warning['200'],
            },
          },
        ],
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: FONT_MONTSERRAT,
            fontWeight: 400,
            fontSize: pxToRem(14),
            minWidth: '375px',
            '> div:first-of-type': {
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            },
          },
          a: {
            color: theme.palette.text.primaryLight,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          colorPrimary: {
            color: theme.palette.primary.light,
          },
        },
      },
      MuiSelect: {
        root: {
          background: 'transparent',
        },
        defaultProps: {
          IconComponent: (props) => (
            <SvgIcon sx={{ fontSize: '16px' }} {...props}>
              <ChevronDownIcon />
            </SvgIcon>
          ),

          inputProps: {
            sx: {
              borderColor: 'transparent',
            },
          },
        },

        styleOverrides: {
          root: {
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
          outlined: {
            backgroundColor: theme.palette.buttons.white.default,
            ...theme.typography.subtitle,
            boxShadow: theme.palette.shadow.gray,
            padding: '6px 8px',
            color: theme.palette.text.dark,
            height: '24px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar1Indeterminate: {
            background: theme.palette.gradients.default,
          },
          bar2Indeterminate: {
            background: theme.palette.gradients.default,
          },
        },
      },
    },
  } as ThemeOptions;
}
