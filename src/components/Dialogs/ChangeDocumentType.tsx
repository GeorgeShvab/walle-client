import { FC, useEffect, useState } from 'react'
import { DialogPropsType, DocumentType } from '../../../types'
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

const ChangeDocumentType: FC<DialogPropsType> = ({
  id,
  title,
  onClose,
  open,
  type,
  onAction,
}) => {
  const [updateDocument, status] = useUpdateDocument()

  const [docType, setDocType] = useState<DocumentType>(type)

  useEffect(() => {
    if (status.error || status.success) {
      onClose()
    }
  }, [status])

  useEffect(() => {
    if (open === false) {
      setDocType(type)
    }
  }, [open])

  const handleUpdate = () => {
    updateDocument({ id, type: docType })
  }

  useEffect(() => {
    if (status.success) onAction && onAction(id)
  }, [status.success])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Зміна розширення {`${title}.${type}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Оберіть потрібне вам розширення
        </DialogContentText>
      </DialogContent>
      <List sx={{ pt: 0 }}>
        <ListItem sx={{ display: 'flex', flexDirection: 'row' }} disableGutters>
          <ListItemButton
            selected={docType === 'txt'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setDocType('txt')}
          >
            <ListItemText secondary="Звичайні текстові файли, мабуть, те що вам потрібно">
              TXT
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            selected={docType === 'json'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setDocType('json')}
          >
            <ListItemText secondary="Формат передачі даних та конфігураційних файлів">
              JSON
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            selected={docType === 'xml'}
            sx={{ paddingLeft: '25px' }}
            onClick={() => setDocType('xml')}
          >
            <ListItemText secondary="Ще один формат передачі даних та конфігураційних файлів">
              XML
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
              Змінити розширення
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ChangeDocumentType
