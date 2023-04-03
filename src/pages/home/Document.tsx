import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import { FC, useRef, useState, MouseEvent, memo } from 'react'
import * as types from '../../../types'
import DocumentIcon from './DocumentIcon'
import { Link } from 'react-router-dom'
import DocumentOptions from './DocumentOptions'

const Document: FC<types.Document> = (props) => {
  const { title, type, id } = props

  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const toggleContextMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()

    toggleContextMenu()
  }

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Link to={`/documents/${id}`}>
      <Paper
        sx={{
          transition: '0.15s box-shadow, 0.15s background',
          maxWidth: '200px',
          display: 'flex',
          flexDirection: 'column',
          aspectRatio: '1 / 1',
          padding: '40px 20px 20px',
          position: 'relative',
          background:
            palette.mode === 'light' ? undefined : palette.background.light,
          '&:hover': {
            boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.22)`,
            background:
              palette.mode === 'light'
                ? undefined
                : palette.background.light + 'd9',
          },
        }}
        onContextMenu={handleContextMenu}
        ref={containerRef}
      >
        <Typography
          textAlign="center"
          width={isLesserThanMd ? '90%' : '80%'}
          variant="h6"
          overflow="hidden"
          flex="0 0 auto"
          position="absolute"
          top={isLesserThanMd ? '10px' : '15px'}
          fontSize={isLesserThanMd ? 'small' : 'medium'}
          left="50%"
          whiteSpace="nowrap"
          sx={{
            transform: 'translateX(-50%)',
            '&::after': {
              content: `""`,
              position: 'absolute',
              display: 'block',
              right: '0',
              top: '0',
              width: '30px',
              height: '100%',
              background: `linear-gradient(90deg, ${
                palette.background.light + '00'
              } 25%, ${palette.background.light} 100%)`,
            },
          }}
        >{`${title}.${type}`}</Typography>
        <Box flex="3 0 auto">
          <DocumentIcon type={type} sx={{ height: '100%' }} />
        </Box>
        <Box
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <DocumentOptions
            open={showMenu}
            onClose={toggleContextMenu}
            anchor={containerRef}
            {...props}
          />
        </Box>
      </Paper>
    </Link>
  )
}

export default memo(Document)
