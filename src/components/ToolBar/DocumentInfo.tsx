import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { FC, useRef, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { AccessType } from '../../../types'

const DocumentInfo: FC<{ access: AccessType }> = ({ access }) => {
  const [open, setOpen] = useState<boolean>(false)

  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <IconButton onClick={() => setOpen(true)} ref={btnRef} size="small">
        <InfoIcon />
      </IconButton>
      <Popover
        anchorEl={btnRef.current}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding="20px 25px" maxWidth="400px">
          <Typography>
            {access === 'restricted'
              ? 'Документ належить іншому користувачу. Ви можете лише переглядати його.'
              : 'Документ належить іншому користувачу. Ви можете переглядати та змінювати його.'}
          </Typography>
        </Box>
      </Popover>
    </>
  )
}

export default DocumentInfo
