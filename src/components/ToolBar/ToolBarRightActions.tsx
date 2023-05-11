import { FC, useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import usePage from '../../hooks/usePage'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ActionsBarWrapper from './ActionsBarWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useLazyGetDocumentQuery } from '../../api/documentApiSlice'
import DocumentOptions from '../DocumentOptions'
import Box from '@mui/material/Box'
import DocumentInfo from './DocumentInfo'
import { useGetMeQuery } from '../../api/userApiSlice'
import { useDownload } from '../../hooks/useDocument'

const ToolBarRightActions: FC = () => {
  const navigate = useNavigate()

  const { data: user } = useGetMeQuery()

  const { page, id } = usePage()

  const { breakpoints } = useTheme()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const handleAdd = () => {
    if (id === 'new') return
    navigate('/documents/new')
  }

  const [trigger, { data }] = useLazyGetDocumentQuery()

  const moreIconRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (page === 'documents' && id && id !== 'new') {
      trigger(id, true)
    }
  }, [page, id])

  if (page === 'home') {
    return (
      <ActionsBarWrapper
        sx={{ paddingRight: isLesserThanMd ? '15px' : undefined }}
      >
        <IconButton size="small" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </ActionsBarWrapper>
    )
  }

  if (page === 'documents' && data) {
    return (
      <>
        <ActionsBarWrapper>
          <>
            {user && (
              <IconButton size="small" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            )}
            {user?.id !== data.owner && (
              <DocumentInfo access={data.access} currentUser={user} />
            )}
            <IconButton
              size="small"
              ref={moreIconRef}
              onClick={() => setShowMenu(true)}
            >
              <MoreVertIcon />
            </IconButton>
          </>
        </ActionsBarWrapper>
        <Box
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <DocumentOptions
            anchor={moreIconRef}
            open={showMenu}
            onClose={() => setShowMenu(false)}
            {...data}
          />
        </Box>
      </>
    )
  }

  return null
}

export default ToolBarRightActions
