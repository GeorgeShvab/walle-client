import MenuList from '@mui/material/MenuList'
import Menu from '@mui/material/Menu'
import ListItemText from '@mui/material/ListItemText'
import { FC, RefObject, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import LockIcon from '@mui/icons-material/Lock'
import { Document } from '../../types'
import DeleteDocument from './Dialogs/DeleteDocument'
import ChangeDocumentAccess from './Dialogs/ChangeDocumentAccess'
import RenameDocument from './Dialogs/RenameDocument'
import ChangeDocumentType from './Dialogs/ChangeDocumentType'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'

interface PropsType extends Document {
  onClose: () => void
  anchor: RefObject<HTMLElement>
  open: boolean
  onDelete?: (arg: string) => void
  onRename?: (arg: string) => void
  onChangeAccess?: (arg: string) => void
  onChangeType?: (arg: string) => void
}

type Action = 'delete' | 'rename' | 'change_type' | 'change_access'

const DocumentOptions: FC<PropsType> = (props) => {
  const { anchor, onClose, open, ...document } = props

  const [action, setAction] = useState<Action | undefined>(undefined)

  const handleClose = () => {
    setAction(undefined)
  }

  const handleClick = (actionType: Action) => {
    setAction(actionType)
    onClose()
  }

  return (
    <>
      <DeleteDocument
        open={action === 'delete'}
        onClose={handleClose}
        onAction={props.onDelete}
        {...document}
      />
      <ChangeDocumentAccess
        open={action === 'change_access'}
        onClose={handleClose}
        onAction={props.onChangeAccess}
        {...document}
      />
      <RenameDocument
        open={action === 'rename'}
        onClose={handleClose}
        onAction={props.onRename}
        {...document}
      />
      <ChangeDocumentType
        open={action === 'change_type'}
        onClose={handleClose}
        onAction={props.onChangeType}
        {...document}
      />
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
        </MenuList>
      </Menu>
    </>
  )
}

export default DocumentOptions
