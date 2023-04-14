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
import { useLazyGetDocumentQuery } from '../../api/documentApiSlice'
import { useAppDispatch } from '../../redux/store'
import { showAlert } from '../../redux/slices/alert'
import DocumentOptions from '../DocumentOptions'
import Box from '@mui/material/Box'
import DocumentInfo from './DocumentInfo'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { useGetMeQuery } from '../../api/userApiSlice'
import { EditorState, RawDraftContentState, convertFromRaw } from 'draft-js'

const ToolBarRightActions: FC = () => {
  const dispatch = useAppDispatch()

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

  const handleDownload = async () => {
    if (!data) return

    try {
      const rawText = EditorState.createWithContent(
        convertFromRaw(JSON.parse(data.text) as RawDraftContentState)
      )
        .getCurrentContent()
        .getPlainText()

      const url = `data:text/${data.type};base64,${btoa(
        unescape(encodeURIComponent(rawText))
      )}`
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${data.title}.${data.type}`
      document.body.appendChild(a)
      a.click()
      a.remove()
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
            {user && (
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
            {user?.id === data.owner ? (
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
