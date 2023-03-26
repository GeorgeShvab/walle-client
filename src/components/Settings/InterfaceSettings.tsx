import Box from '@mui/material/Box'
import { FC } from 'react'
import SettingsItemHeader from './SettingsItemHeader'
import ModeSettings from './ModeSettings'
import FontSettings from './FontSettings'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectSettings, setSettings } from '../../redux/slices/settings'
import { Font, Mode } from '../../../types'
import { useUpdateSettings } from './useSettings'

const InterfaceSettings: FC = () => {
  const dispatch = useAppDispatch()

  const settings = useAppSelector(selectSettings)

  const updateSettings = useUpdateSettings()

  const onFontChange = (font: Font) => {
    dispatch(setSettings({ font }))

    updateSettings({ font })
  }

  const onModeChange = (mode: Mode) => {
    dispatch(setSettings({ mode }))

    updateSettings({ mode })
  }

  return (
    <Box>
      <Box sx={{ mb: '50px' }}>
        <SettingsItemHeader
          subtitle={'Оберіть зручну вам тему'}
          sx={{ mb: '20px' }}
        >
          Тема інтерфейсу
        </SettingsItemHeader>
        <ModeSettings mode={settings.mode} onSelect={onModeChange} />
      </Box>
      <Box>
        <SettingsItemHeader
          subtitle={'Оберіть приємний вам шрифт'}
          sx={{ mb: '20px' }}
        >
          Шрифт
        </SettingsItemHeader>
        <FontSettings font={settings.font} onSelect={onFontChange} />
      </Box>
    </Box>
  )
}

export default InterfaceSettings
