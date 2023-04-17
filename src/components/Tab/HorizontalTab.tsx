import Box from '@mui/material/Box'
import { FC, MouseEvent, memo } from 'react'
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
    <Box
      className={`tab${document.selected ? ' selected' : ''}`}
      sx={{
        '&:first-of-type .tab-content': {
          borderRadius: '5px 5px 0 0',
          '&::after': {
            opacity: '0',
          },
        },
        '&:last-child .tab-content': {
          borderRadius: '5px 5px 0 0',
        },
        //selected tab styles
        '&.selected + div .tab-content::after': {
          opacity: '0',
        },
        '&.selected .tab-content': {
          backgroundColor: palette.background.default,
          '&::after': {
            opacity: '0',
          },
        },
        '&.selected .tab-corner': {
          opacity: '1',
          zIndex: '5',
          backgroundColor: palette.background.default,
        },
        '&:not(.selected) .tab-content:hover': {
          background:
            palette.mode === 'light' ? palette.grey[100] : palette.grey[800],

          '& .tab-corner': {
            background:
              palette.mode === 'light' ? palette.grey[100] : palette.grey[800],
            opacity: '1',
          },
        },
        // animation styles
        '&.tab-enter': {
          maxWidth: '0px',
          opacity: '0',
        },
        '&.tab-enter-active': {
          maxWidth: '300px',
          opacity: '1',
          transition: 'max-width ease-out 0.3s, opacity ease-out 0.3s',
        },
        '&.tab-exit': {
          maxWidth: '300px',
          opacity: '1',
        },
        '&.tab-exit-active': {
          maxWidth: '0px',
          opacity: '0',
          transition: 'max-width ease-out 0.3s, opacity ease-out 0.3s',
        },
        overflow: 'hidden',
      }}
    >
      <Box padding="0 5px">
        <Link to={`/documents/${document.id}`}>
          <Box
            className="tab-content"
            display="flex"
            alignItems="center"
            height="42px"
            padding="0 6px 0 30.5px"
            position="relative"
            onClick={handleClick}
            borderRadius="5px 5px 0 0"
            sx={{
              '&::after': {
                content: `''`,
                position: 'absolute',
                backgroundColor:
                  palette.mode === 'light'
                    ? palette.grey[400]
                    : palette.grey[800],
                display: 'block',
                left: '-5px',
                width: '1px',
                height: '40%',
                top: '50%',
                transform: 'translateY(-50%)',
                transition: '0.3s ease-out opacity',
              },
              maxWidth: '200px',
              cursor: 'pointer',
              transition: '0.3s ease-out background',
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
              className="tab-title"
              variant="h6"
              fontSize="small"
              mr="4px"
              maxWidth="160px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="hidden"
              position="relative"
              sx={{
                background: `linear-gradient(90deg, ${
                  palette.primary.main
                } 90px, ${palette.primary.main + '00'})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
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
              className="tab-corner"
              sx={{
                width: '5px',
                height: '100%',
                position: 'absolute',
                left: '-5px',
                transition: '0.3s ease-out background, 0.3s ease-out opacity',
                opacity: '0',
                background: palette.background.default,
                '&::before': {
                  content: `""`,
                  display: 'block',
                  background:
                    palette.mode === 'light'
                      ? palette.grey[50]
                      : palette.background.light,
                  width: '5px',
                  height: '100%',
                  borderRadius: '0 0 5px 0',
                  transition: '0.3s ease-out background, 0.3s ease-out opacity',
                },
              }}
            />
            <Box
              className="tab-corner"
              sx={{
                width: '5px',
                height: '100%',
                position: 'absolute',
                right: '-5px',
                transition: '0.3s ease-out background, 0.3s ease-out opacity',
                opacity: '0',
                background: palette.background.default,
                '&::before': {
                  content: `""`,
                  display: 'block',
                  background:
                    palette.mode === 'light'
                      ? palette.grey[50]
                      : palette.background.light,
                  width: '5px',
                  height: '100%',
                  borderRadius: '0 0 0 5px',
                  transition: '0.3s ease-out background, 0.3s ease-out opacity',
                },
              }}
            />
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

export default memo(HorizontalTab)
