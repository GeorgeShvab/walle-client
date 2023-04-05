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

const VerticalTab: FC<PropsType> = (props) => {
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
        //selected styles
        '&.selected + div .tab-content::before': {
          opacity: '0',
        },
        '&.selected .tab-content': {
          backgroundColor: palette.background.default,
          '&::before': {
            opacity: '0',
          },
          '& .remove': {
            visibility: 'visible',
          },
        },
        '&.selected .tab-corner': {
          opacity: '1',
          zIndex: '5',
          backgroundColor: palette.background.default,
        },
        '&.selected': {
          zIndex: '5',
        },
        // animation styles
        '&.tab-enter': {
          maxHeight: '0px',
          opacity: '0',
        },
        '&.tab-enter-active': {
          maxHeight: '60px',
          opacity: '1',
          transition: 'max-height ease-out 0.3s, opacity ease-out 0.3s',
        },
        '&.tab-exit': {
          maxHeight: '60px',
          opacity: '1',
        },
        '&.tab-exit-active': {
          maxHeight: '0px',
          opacity: '0',
          transition: 'max-height ease-out 0.3s, opacity ease-out 0.3s',
        },
      }}
    >
      <Link to={`/documents/${document.id}`}>
        <Box padding="0 15px 0 0">
          <Box
            className="tab-content"
            display="flex"
            alignItems="center"
            height="50px"
            padding="0 15px 0 25px"
            position="relative"
            onClick={handleClick}
            borderRadius="0 5px 5px 0"
            sx={{
              '&::before': {
                content: `''`,
                position: 'absolute',
                backgroundColor:
                  palette.mode === 'light'
                    ? palette.grey[300]
                    : palette.grey[800],
                display: 'block',
                left: '0',
                width: '95%',
                height: '1px',
                top: '0',
                transition: '0.3s ease-out opacity',
              },
              width: '100%',
              cursor: 'pointer',
              transition: '0.3s ease-out background',
              backgroundColor:
                palette.mode === 'light'
                  ? palette.grey[100]
                  : palette.background.light,
            }}
          >
            <TabIcon
              type={document.type}
              sx={{ marginRight: '12px', height: '25px' }}
            />
            <Typography
              className="tab-title"
              variant="h6"
              fontSize="medium"
              mr="12px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="hidden"
              position="relative"
              flex="3 0 74%"
              sx={{
                background: `linear-gradient(90deg, ${
                  palette.primary.main
                } 80%, ${palette.primary.main + '00'})`,
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
                  height: '20px',
                  width: '20px',
                }}
              />
            </IconButton>
            <Box
              className="tab-corner"
              sx={{
                width: '5px',
                height: '5px',
                position: 'absolute',
                left: '0',
                top: '-5px',
                transition: '0.3s ease-out background, 0.3s ease-out opacity',
                zIndex: '0',
                opacity: '0',
                '&::before': {
                  content: `""`,
                  display: 'block',
                  backgroundColor:
                    palette.mode === 'light'
                      ? palette.grey[100]
                      : palette.background.light,
                  width: '5px',
                  height: '5px',
                  borderRadius: '0 0 0 5px',
                  transition: '0.3s ease-out background, 0.3s ease-out opacity',
                },
              }}
            />
            <Box
              className="tab-corner"
              sx={{
                width: '5px',
                height: '5px',
                position: 'absolute',
                left: '0',
                bottom: '-5px',
                transition: '0.3s ease-out background, 0.3s ease-out opacity',
                zIndex: '0',
                opacity: '0',
                '&::before': {
                  content: `""`,
                  display: 'block',
                  backgroundColor:
                    palette.mode === 'light'
                      ? palette.grey[100]
                      : palette.background.light,
                  width: '5px',
                  height: '5px',
                  borderRadius: '5px 0 0 0',
                  transition: '0.3s ease-out background, 0.3s ease-out opacity',
                },
              }}
            />
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default memo(VerticalTab)
