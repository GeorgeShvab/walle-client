import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import { FC } from 'react'

const TabCorners: FC<{ selected: boolean }> = ({ selected }) => {
  const { palette } = useTheme()

  return (
    <>
      <Box
        sx={{
          width: '5px',
          height: '100%',
          position: 'absolute',
          left: '-5px',
          opacity: selected ? '1' : '0',
          backgroundColor: palette.background.default,
          '&::before': {
            content: `""`,
            display: 'block',
            backgroundColor:
              palette.mode === 'light'
                ? palette.grey[50]
                : palette.background.light,
            width: '5px',
            height: '100%',
            borderRadius: '0 0 5px 0',
          },
        }}
      />
      <Box
        sx={{
          width: '5px',
          height: '100%',
          position: 'absolute',
          right: '-5px',
          opacity: selected ? '1' : '0',
          zIndex: selected ? '5' : '1',
          backgroundColor: palette.background.default,
          '&::before': {
            content: `""`,
            display: 'block',
            backgroundColor:
              palette.mode === 'light'
                ? palette.grey[50]
                : palette.background.light,
            width: '5px',
            height: '100%',
            borderRadius: '0 0 0 5px',
          },
        }}
      />
    </>
  )
}

export default TabCorners
