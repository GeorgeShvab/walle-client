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
      sx={
        document.selected
          ? {
              '& + div > a > div > div::before': {
                display: 'none',
              },
            }
          : {}
      }
    >
      <Link to={`/documents/${document.id}`}>
        <Box padding="0 15px 0 0">
          <Box
            display="flex"
            alignItems="center"
            height="50px"
            padding="0 15px 0 25px"
            position="relative"
            className={document.selected ? 'selected' : ''}
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
                transition: '0.4s opacity',
              },
              '&.selected': {
                backgroundColor: palette.background.default,
                '&::before': {
                  opacity: '0',
                },
                '& .remove': {
                  visibility: 'visible',
                },
              },
              width: '100%',
              cursor: 'pointer',
              transition: '0.4s background',
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
              variant="h6"
              fontSize="medium"
              mr="12px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="hidden"
              position="relative"
              flex="3 0 74%"
              sx={{
                '&::before': {
                  content: `''`,
                  position: 'absolute',
                  height: '100%',
                  width: '10px',
                  display: 'block',
                  right: '0',
                  top: '0',
                  transition: '0.4s background',
                  background: document.selected
                    ? `linear-gradient(90deg, ${
                        palette.background.default + '00'
                      } 0%, ${palette.background.default} 100%)`
                    : `linear-gradient(90deg, ${
                        (palette.mode === 'light'
                          ? palette.grey[100]
                          : palette.background.light) + '00'
                      } 0%, ${
                        palette.mode === 'light'
                          ? palette.grey[100]
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
                  height: '20px',
                  width: '20px',
                }}
              />
            </IconButton>
            <Box
              sx={{
                width: '5px',
                height: '5px',
                position: 'absolute',
                left: '0',
                top: '-5px',
                opacity: document.selected ? '1' : '0',
                backgroundColor: palette.background.default,
                transition: '0.4s background',
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
                  transition: '0.4s background',
                },
              }}
            />
            <Box
              sx={{
                width: '5px',
                height: '5px',
                position: 'absolute',
                left: '0',
                bottom: '-5px',
                opacity: document.selected ? '1' : '0',
                zIndex: document.selected ? '5' : '1',
                backgroundColor: palette.background.default,
                transition: '0.4s background',
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
                  transition: '0.4s background',
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
