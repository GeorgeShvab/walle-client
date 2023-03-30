import Tooltip from '@mui/material/Tooltip'
import useTheme from '@mui/material/styles/useTheme'
import IconButton from '@mui/material/IconButton'
import { FC, MouseEvent, ReactElement } from 'react'
import Box from '@mui/material/Box'

interface PropsTypes {
  children: ReactElement
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void
  selected?: boolean
  title: string
}

const ToolBarButton: FC<PropsTypes> = ({
  children,
  onSelect,
  selected,
  title,
}) => {
  const { palette } = useTheme()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSelect(e)
  }

  return (
    <Box
      className={selected ? 'selected' : ''}
      sx={{
        padding: '3px',
        '&.selected': {
          backgroundColor:
            palette.mode === 'light'
              ? palette.grey[200]
              : palette.background.default,
        },
      }}
    >
      <Tooltip title={title}>
        <IconButton
          onClick={handleClick}
          onMouseDown={(e) => e.preventDefault()}
        >
          {children}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ToolBarButton
