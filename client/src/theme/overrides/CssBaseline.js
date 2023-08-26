export default function CssBaseline(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '@media only screen and (min-width: 600px)': {
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: `${theme.palette.grey[400]}`,
            },

            // '&::-webkit-scrollbar-thumb:active': {
            //   backgroundColor: `${theme.palette.primary.light}`
            // },

            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },

            // '&::-webkit-scrollbar-track': {
            //   boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            //   borderRadius: `8px`
            // },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `${theme.palette.grey[600]}`,
              borderRadius: `8px`

            }
          }
        }
      },
    },
  };
};