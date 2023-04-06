import { FC, useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import usePage from '../../hooks/usePage'
import DownloadIcon from '@mui/icons-material/Download'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ActionsBarWrapper from './ActionsBarWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import getLocalValue from '../../utils/getLocalValue'
import { useLazyGetDocumentQuery } from '../../api/documentApiSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { showAlert } from '../../redux/slices/alert'
import DocumentOptions from '../DocumentOptions'
import Box from '@mui/material/Box'
import { selectUser } from '../../redux/slices/user'
import DocumentInfo from './DocumentInfo'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

const ToolBarRightActions: FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const currentUser = useAppSelector(selectUser)

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

  const handleDownload = async () => {
    if (!data) return

    const filePath = `${
      import.meta.env.VITE_APP_SERVER_ADDRESS
    }/document/${id}/download`

    try {
      fetch(filePath, {
        headers: {
          authorization: getLocalValue('AccessToken'),
        },
      })
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = `${data.title}.${data.type}`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
    } catch (e) {
      dispatch(showAlert('Помилка при завантаженні файлу'))
    }
  }

  useEffect(() => {
    if (page === 'documents' && id && id !== 'new') {
      trigger(id, true)
    }
  }, [page, id])

  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(document.location.href)
    } catch (e) {}
  }

  if (page === 'documents' && data) {
    return (
      <>
        <ActionsBarWrapper>
          <>
            {currentUser.data && (
              <IconButton size="small" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            )}

            <IconButton size="small" onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
            <IconButton size="small" onClick={handleCopyClick}>
              <InsertLinkIcon />
            </IconButton>
            {currentUser.data?.id === data.owner ? (
              <IconButton
                size="small"
                ref={moreIconRef}
                onClick={() => setShowMenu(true)}
              >
                <MoreVertIcon />
              </IconButton>
            ) : (
              <DocumentInfo access={data.access} />
            )}
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
  } else if (page === 'home') {
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

  return null
}

export default ToolBarRightActions
