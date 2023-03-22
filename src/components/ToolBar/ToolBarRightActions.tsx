import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import usePage from '../../hooks/usePage'
import DownloadIcon from '@mui/icons-material/Download'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ActionsBarWrapper from './ActionsBarWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const ToolBarRightActions: FC = () => {
  const navigate = useNavigate()

  const { page } = usePage()

  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const handleAdd = () => {
    navigate('/documents/new')
  }

  if (page === 'documents') {
    return (
      <ActionsBarWrapper>
        <>
          {isLesserThanMd && (
            <IconButton size="small" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          )}
          <IconButton size="small">
            <DownloadIcon />
          </IconButton>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </>
      </ActionsBarWrapper>
    )
  } else if (isLesserThanMd && page === 'home') {
    return (
      <ActionsBarWrapper sx={{ paddingRight: '15px' }}>
        <IconButton size="small" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </ActionsBarWrapper>
    )
  }

  return null
}

export default ToolBarRightActions
