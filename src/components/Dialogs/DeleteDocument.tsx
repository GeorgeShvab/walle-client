import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC, useEffect } from 'react'
import { useDeleteDocument } from '../../hooks/useDocument'
import { DialogPropsType } from '../../../types'
import LoadingButton from '@mui/lab/LoadingButton'

const DeleteDocument: FC<DialogPropsType> = ({
  open,
  onClose,
  title,
  id,
  type,
}) => {
  const [deleteDocument, { isLoading, isSuccess, isError }] =
    useDeleteDocument()

  useEffect(() => {
    if (isError || isSuccess) {
      onClose()
    }
  }, [isError, isSuccess, isLoading])

  const handleDelete = () => {
    deleteDocument(id)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Видалити {`${title}.${type}`}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ця дія видалить документ назавжди, відмінити її неможливо
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Відмінити</Button>
        <LoadingButton
          onClick={handleDelete}
          loading={isLoading}
          variant="outlined"
          color="error"
          autoFocus
        >
          Видалити
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDocument
