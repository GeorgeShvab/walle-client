import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC, useEffect } from 'react'
import { Document, DocumentType } from '../../../types'
import { useUpdateDocument } from '../../hooks/useDocument'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik, FormikHelpers } from 'formik'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'

interface PropsTypes extends Document {
  open: boolean
  onClose: () => void
  onAction?: (arg: string) => void
}

interface RenameRequestBody {
  title: string
}

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .max(100, 'Назва повинна містити не більше 100 символів')
    .required('Введіть назву'),
})

const RenameDocument: FC<PropsTypes> = ({
  open,
  onClose,
  title,
  id,
  type,
  onAction,
}) => {
  const [updateDocument, status] = useUpdateDocument()

  useEffect(() => {
    if (status.error || status.success) {
      onClose()
    }
  }, [status])

  const handleSubmit = (
    args: RenameRequestBody,
    actions: FormikHelpers<RenameRequestBody>
  ) => {
    let ext = type

    if (
      /./.test(args.title) &&
      ['json', 'txt', 'xml'].includes(args.title.split('.').reverse()[0])
    ) {
      ext = args.title.split('.').reverse()[0] as DocumentType

      const title = args.title
        .split('')
        .splice(0, args.title.length - (ext.length + 1))
        .join('')

      updateDocument(
        {
          title,
          type: ext,
          id,
        },
        actions
      )
    } else {
      updateDocument({ ...args, type: ext, id }, actions)
    }
  }

  useEffect(() => {
    if (status.success) onAction && onAction(id)
  }, [status.success])

  const initialValues: RenameRequestBody = {
    title: `${title}.${type}`,
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">
              Зміна назви {`${title}.${type}`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ mb: '20px' }}
              >
                Введіть нову назву документа. Назва повинна містити не більше
                100 символів
              </DialogContentText>
              <TextField
                name="title"
                type="text"
                value={values.title}
                error={Boolean(errors.title) && touched.title}
                helperText={(touched.title && errors.title) || ' '}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                fullWidth
              />
            </DialogContent>
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
                  <Button type="submit" variant="outlined">
                    Змінити назву
                  </Button>
                </>
              )}
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}

export default RenameDocument
