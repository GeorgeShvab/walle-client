import { FC } from 'react'
import { SettingsSection } from '../../../types'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import TuneIcon from '@mui/icons-material/Tune'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

interface PropsType {
  section: SettingsSection
  onClick: (arg: SettingsSection) => void
}

const SettingsMenu: FC<PropsType> = ({ section, onClick }) => {
  return (
    <List>
      <ListItemButton
        selected={section === 'interface'}
        onClick={() => onClick('interface')}
        sx={{
          '&.Mui-selected': {
            background: 'none',
            position: 'relative',
            /*'&::after': {
              opacity: '1 !important',
            },*/
            opacity: '1',
          },
          '&:hover': {
            backgroundColor: 'transparent ! important',
            /*'&::after': {
              opacity: '0.5',
            },*/
            opacity: '1',
          },
          /*'&::after': { // old hover effect
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            content: `""`,
            height: '25%',
            width: '4px',
            backgroundColor:
              mode === 'light'
                ? lightThemeTokens.primary.main
                : darkThemeTokens.primary.main,
            borderRadius: '2px 2px 2px 2px',
            opacity: '0',
            transition: '0.15s opacity',
          },*/
          paddingLeft: '25px',
          '& > div:first-of-type': {
            minWidth: '46px',
          },
          opacity: '0.35',
          transition: '0.25s opacity',
        }}
      >
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Інтерфейс" />
      </ListItemButton>
      <ListItemButton
        selected={section === 'account'}
        onClick={() => onClick('account')}
        sx={{
          '&.Mui-selected': {
            background: 'none',
            position: 'relative',
            /*'&::after': {
              opacity: '1 !important',
            },*/
            opacity: '1',
          },
          '&:hover': {
            backgroundColor: 'transparent ! important',
            /*'&::after': {
              opacity: '0.5',
            },*/
            opacity: '1',
          },
          /*'&::after': { // old hover effect
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            content: `""`,
            height: '25%',
            width: '4px',
            backgroundColor:
              mode === 'light'
                ? lightThemeTokens.primary.main
                : darkThemeTokens.primary.main,
            borderRadius: '2px 2px 2px 2px',
            opacity: '0',
            transition: '0.15s opacity',
          },*/
          paddingLeft: '25px',
          '& > div:first-of-type': {
            minWidth: '46px',
          },
          opacity: '0.35',
          transition: '0.25s opacity',
        }}
      >
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Аккаунт" />
      </ListItemButton>
    </List>
  )
}

export default SettingsMenu
