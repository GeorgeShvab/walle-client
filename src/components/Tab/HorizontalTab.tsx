import Box from '@mui/material/Box'
import { FC, MouseEvent } from 'react'
import * as types from '../../../types'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import TabIcon from './TabIcon'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { Tab } from '../../../types'

type PropsType = Tab & {
  selected?: boolean
  onClick?: (document: Tab) => void
  onClose?: (document: Tab) => void
}

const HorizontalTab: FC<PropsType> = (props) => {
  const { onClick, onClose, ...document } = props

  const { palette } = useTheme()

  const handleClick = () => {
    onClick && onClick(document)
  }

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    onClose && onClose(document)
  }

  return (
    <Link to={`/documents/${document.id}`}>
      <Box
        display="flex"
        alignItems="center"
        height="42px"
        padding="0 6px 0 30.5px"
        position="relative"
        className={document.selected ? 'selected' : ''}
        onClick={handleClick}
        borderRadius="5px 5px 0 0"
        sx={{
          '&::after': {
            content: `''`,
            position: 'absolute',
            backgroundColor:
              palette.mode === 'light' ? palette.grey[400] : palette.grey[800],
            display: 'block',
            right: '0',
            width: '1px',
            height: '40%',
            top: '50%',
            transform: 'translateY(-50%)',
          },
          '&.selected': {
            backgroundColor: palette.background.default,
            '&::after': {
              display: 'none',
            },
          },
          '&:last-child': {
            borderRadius: '5px 5px 0 0',
          },
          '&:first-of-type': {
            borderRadius: '5px 5px 0 0',
          },
          maxWidth: '200px',
          cursor: 'pointer',
          backgroundColor:
            palette.mode === 'light'
              ? palette.grey[50]
              : palette.background.light,
          '&:hover': {
            '& .remove': {
              visibility: 'visible',
            },
          },
        }}
      >
        <TabIcon type={document.type} sx={{ marginRight: '10px' }} />
        <Typography
          variant="h6"
          fontSize="small"
          mr="4px"
          maxWidth="160px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="hidden"
          position="relative"
          sx={{
            '&::after': {
              content: `''`,
              position: 'absolute',
              height: '100%',
              width: '10px',
              display: 'block',
              left: '107.5px',
              top: '0',
              background: document.selected
                ? `linear-gradient(90deg, ${
                    palette.background.default + '00'
                  } 0%, ${palette.background.default} 100%)`
                : `linear-gradient(90deg, ${
                    (palette.mode === 'light'
                      ? palette.grey[50]
                      : palette.background.light) + '00'
                  } 0%, ${
                    palette.mode === 'light'
                      ? palette.grey[50]
                      : palette.background.light
                  } 100%)`,
            },
          }}
        >
          {`${document.title}.${document.type}`}
        </Typography>
        <IconButton
          sx={{ height: '20px', width: '20px', visibility: 'hidden' }}
          className="remove"
          onClick={handleRemove}
        >
          <CloseIcon
            sx={{
              height: '15px',
              width: '15px',
            }}
          />
        </IconButton>
        <Box
          sx={{
            width: '5px',
            height: '100%',
            position: 'absolute',
            left: '-5px',
            opacity: document.selected ? '1' : '0',
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
            opacity: document.selected ? '1' : '0',
            zIndex: document.selected ? '5' : '1',
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
      </Box>
    </Link>
  )
}

export default HorizontalTab
