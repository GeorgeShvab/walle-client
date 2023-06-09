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
import LoadingButton from '@mui/lab/LoadingButton'

const ChangeDocumentType: FC<DialogPropsType> = ({
  id,
  title,
  onClose,
  open,
  type,
}) => {
  const [updateDocument, { isLoading, isSuccess, isError }] =
    useUpdateDocument()

  const [docType, setDocType] = useState<DocumentType>(type)

  useEffect(() => {
    if (isError || isSuccess) {
      onClose()
    }
  }, [isError, isSuccess, isLoading])

  const handleUpdate = () => {
    updateDocument({ id, type: docType })
  }

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
        <Button onClick={onClose}>Відмінити</Button>
        <LoadingButton
          onClick={handleUpdate}
          loading={isLoading}
          variant="outlined"
          autoFocus
        >
          Змінити розширення
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeDocumentType
