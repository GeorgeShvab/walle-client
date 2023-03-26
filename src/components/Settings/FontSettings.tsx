import Box from '@mui/material/Box'
import { FC, useState } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import { Font } from '../../../types'

interface PropsType {
  font: Font
  onSelect: (arg: Font) => void
}

const FontSettings: FC<PropsType> = (props) => {
  const { palette } = useTheme()

  const [font, setFont] = useState<Font>(props.font)

  const handleSelect = (arg: Font) => {
    props.onSelect(arg)

    setFont(arg)
  }

  return (
    <Box>
      <Box display="flex" gap="10px">
        <Typography
          height="35px"
          width="35px"
          lineHeight="35px"
          textAlign="center"
          className={font === 'Rubik' ? 'selected' : ''}
          onClick={() => handleSelect('Rubik')}
          sx={{
            '&.selected': {
              borderRadius: '5px',
              outline: `2px solid ${palette.primary.main}`,
            },
            fontFamily: 'Rubik, sans-serif',
          }}
        >
          T t
        </Typography>
        <Typography
          height="35px"
          width="35px"
          lineHeight="35px"
          textAlign="center"
          className={font === 'Roboto' ? 'selected' : ''}
          onClick={() => handleSelect('Roboto')}
          sx={{
            '&.selected': {
              borderRadius: '5px',
              outline: `2px solid ${palette.primary.main}`,
            },
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          T t
        </Typography>
        <Typography
          height="35px"
          width="35px"
          lineHeight="35px"
          textAlign="center"
          className={font === 'Roboto Slab' ? 'selected' : ''}
          onClick={() => handleSelect('Roboto Slab')}
          sx={{
            '&.selected': {
              borderRadius: '5px',
              outline: `2px solid ${palette.primary.main}`,
            },
            fontFamily: 'Roboto Slab, serif',
          }}
        >
          T t
        </Typography>
      </Box>
    </Box>
  )
}

export default FontSettings
