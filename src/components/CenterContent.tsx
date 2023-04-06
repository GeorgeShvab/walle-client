import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

const CenterContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
})

export default CenterContent
