import MenuList from '@mui/material/MenuList'
import Menu from '@mui/material/Menu'
import ListItemText from '@mui/material/ListItemText'
import { FC, RefObject, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import LockIcon from '@mui/icons-material/Lock'
import DeleteDocument from './Dialogs/DeleteDocument'
import ChangeDocumentAccess from './Dialogs/ChangeDocumentAccess'
import RenameDocument from './Dialogs/RenameDocument'
import ChangeDocumentType from './Dialogs/ChangeDocumentType'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  useGetDocumentQuery,
  useLazyGetDocumentQuery,
} from '../api/documentApiSlice'
import { useCopyDocumentLink, useDownload } from '../hooks/useDocument'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import DownloadIcon from '@mui/icons-material/Download'
import { useGetMeQuery } from '../api/userApiSlice'
import { useAppDispatch } from '../redux/store'
import { showAlert } from '../redux/slices/alert'
import { Document } from '../../types'

interface PropsType {
  onClose: () => void
  anchor: RefObject<HTMLElement>
  open: boolean
  id: string
}

type Action = 'delete' | 'rename' | 'change_type' | 'change_access'

const DocumentOptions: FC<PropsType & Document> = (props) => {
  const { anchor, onClose, open, ...data } = props

  const { data: user } = useGetMeQuery()

  const [action, setAction] = useState<Action | undefined>(undefined)

  const handleClose = () => setAction(undefined)

  const download = useDownload(props)

  const copy = useCopyDocumentLink(data.id)

  const handleDownload = () => {
    handleClose()
    onClose()
    download()
  }

  const handleCopyClick = () => {
    handleClose()
    onClose()
    copy()
  }

  const handleClick = (actionType: Action) => {
    setAction(actionType)
    onClose()
  }

  return (
    <>
      {data && (
        <>
          <DeleteDocument
            open={action === 'delete'}
            onClose={handleClose}
            key={data.id}
            {...data}
          />
          <ChangeDocumentAccess
            open={action === 'change_access'}
            onClose={handleClose}
            key={data.access}
            {...data}
          />
          <RenameDocument
            open={action === 'rename'}
            onClose={handleClose}
            key={data.title}
            {...data}
          />
          <ChangeDocumentType
            open={action === 'change_type'}
            onClose={handleClose}
            key={data.type}
            {...data}
          />
        </>
      )}
      <Menu
        id="lock-menu"
        anchorEl={anchor.current}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {data?.owner !== user?.id ? (
          <MenuList>
            <MenuItem onClick={handleDownload}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Завантажити документ</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCopyClick}>
              <ListItemIcon>
                <InsertLinkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Скопіювати посилання</ListItemText>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuItem onClick={() => handleClick('rename')}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Перейменувати</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleClick('change_type')}>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Змінити розширення</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleClick('delete')}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Видалити</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleClick('change_access')}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Налаштування доступу</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDownload}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Завантажити документ</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCopyClick}>
              <ListItemIcon>
                <InsertLinkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Скопіювати посилання</ListItemText>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  )
}

export default DocumentOptions
