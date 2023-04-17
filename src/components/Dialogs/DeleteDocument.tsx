import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC, useEffect } from 'react'
import { useDeleteDocument } from '../../hooks/useDocument'
import CircularProgress from '@mui/material/CircularProgress'
import { DialogPropsType } from '../../../types'

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
        {isLoading ? (
          <Box display="flex" justifyContent="center" width="100%">
            <Box sx={{ transform: 'translateY(-10px)' }}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <Button onClick={onClose}>Відмінити</Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="outlined"
              autoFocus
            >
              Видалити
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDocument
