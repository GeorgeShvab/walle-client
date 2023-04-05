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
import {
  useGetDocumentQuery,
  useLazyGetDocumentQuery,
} from '../../api/documentApiSlice'
import { useAppDispatch } from '../../redux/store'
import { showAlert } from '../../redux/slices/alert'
import DocumentOptions from '../DocumentOptions'
import Box from '@mui/material/Box'
import { closeTab } from '../../redux/slices/tabs'

const ToolBarRightActions: FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { page, id } = usePage()

  const { breakpoints } = useTheme()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const handleAdd = () => {
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

  if (page === 'documents') {
    return (
      <>
        <ActionsBarWrapper>
          <>
            <IconButton size="small" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
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
          {data && (
            <DocumentOptions
              anchor={moreIconRef}
              open={showMenu}
              onClose={() => setShowMenu(false)}
              {...data}
            />
          )}
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
