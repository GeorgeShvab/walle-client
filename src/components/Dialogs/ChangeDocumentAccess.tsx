import { FC, useEffect, useState } from 'react'
import { AccessType, DialogPropsType } from '../../../types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { useUpdateDocument } from '../../hooks/useDocument'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const ChangeDocumentAccess: FC<DialogPropsType> = ({
  id,
  title,
  access,
  onClose,
  open,
  type,
}) => {
  const [updateDocument, status] = useUpdateDocument()

  const [accessType, setAccessType] = useState<AccessType>(access)

  useEffect(() => {
    if (status.error || status.success) {
      onClose()
    }
  }, [status])

  useEffect(() => {
    if (open === false) {
      setAccessType(access)
    }
  }, [open])

  const handleUpdate = () => {
    updateDocument({ access: accessType, id })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Налаштування доступу {`${title}.${type}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Оберіть потрібний вам тип доступу
        </DialogContentText>
      </DialogContent>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            selected={accessType === 'private'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setAccessType('private')}
          >
            <ListItemText secondary="Переглядати та редагувати документ можете лише ви">
              Особистий доступ
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            selected={accessType === 'restricted'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setAccessType('restricted')}
          >
            <ListItemText secondary="Переглядати документ можуть всі, а редагувати тільки ви">
              Обмежений доступ
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            selected={accessType === 'public'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setAccessType('public')}
          >
            <ListItemText secondary="Переглядати та редагувати документ може будь-хто">
              Відкритий доступ
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <DialogActions>
        {status.isLoading ? (
          <Box display="flex" justifyContent="center" width="100%">
            <Box sx={{ transform: 'translateY(-10px)' }}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <Button onClick={onClose}>Відмінити</Button>
            <Button onClick={handleUpdate} variant="outlined" autoFocus>
              Змінити тип доступу
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ChangeDocumentAccess
