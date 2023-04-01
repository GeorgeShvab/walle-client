import { FC, useState, useCallback, KeyboardEvent } from 'react'
import {
  EditorState,
  ContentState,
  CompositeDecorator,
  ContentBlock,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  RichUtils,
  getDefaultKeyBinding,
} from 'draft-js'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Document } from '../../../types'
import ToolBar from './ToolBar'
import { Link, LinkifyLink } from './Link'
import Editor from '@draft-js-plugins/editor'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import Box from '@mui/material/Box'
import { useUpdateDocumentText } from '../../hooks/useDocument'
import debounce from '../../utils/debounce'

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
}

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

const linkifyPlugin = createLinkifyPlugin({ component: LinkifyLink })

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
])

const standardCommands: string[] = ['bold', 'underline', 'italic']

const TextEditor: FC<
  Document & { isLoading: boolean; currentUser: string | undefined }
> = ({ text, id, isLoading, currentUser, owner, access }) => {
  const { palette, breakpoints } = useTheme()

  const [update] = useUpdateDocumentText()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [editorState, setEditorState] = useState<EditorState>(
    text
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(text) as RawDraftContentState)
        )
      : EditorState.createEmpty()
  )

  const updateDoc = useCallback(
    debounce((state: EditorState) => {
      if (!isLoading) {
        if (owner === currentUser || access === 'public') {
          update({
            text: JSON.stringify(convertToRaw(state.getCurrentContent())),
            id,
          })
        }
      }
    }, 7500),
    [id, isLoading]
  )

  const handleChange = useCallback(
    (state: EditorState) => {
      setEditorState(state)
      updateDoc(state)
    },
    [id, isLoading]
  )

  const handleKeyCommand = (
    command: string,
    state: EditorState
  ): 'handled' | 'not-handled' => {
    if (standardCommands.includes(command)) {
      const newState = RichUtils.handleKeyCommand(state, command)

      newState && setEditorState(newState)
      return 'handled'
    } else if (command === 'strikethrough') {
      const newState = RichUtils.toggleInlineStyle(state, command.toUpperCase())

      newState && setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const keyBinding = (e: KeyboardEvent): null | string => {
    if (e.key === 's' && e.ctrlKey) {
      return 'strikethrough'
    }

    return getDefaultKeyBinding(e)
  }

  return (
    <Box>
      <Box padding={isLesserThanMd ? '15px 15px 60px' : '25px'}>
        <Box
          sx={{
            border: `1px solid ${palette.primary.main}1a`,
            backgroundColor:
              palette.mode === 'light'
                ? palette.grey[50] + '26'
                : palette.background.dark,
            borderRadius: '5px',
            padding: '7px 10px 8px',
            minHeight: 'calc(100vh - 92px)',
            'div.DraftEditor-root': {
              width: '100%',
              minHeight: 'calc(100vh - 190px)',
            },
            'div.DraftEditor-editorContainer, div.public-DraftEditor-content': {
              minHeight: 'calc(100vh - 190px)',
              color: palette.primary.main,
            },
          }}
        >
          <Editor
            editorState={editorState}
            customStyleMap={styleMap}
            onChange={handleChange}
            keyBindingFn={keyBinding}
            handleKeyCommand={handleKeyCommand}
            plugins={[linkifyPlugin, { decorators: [decorator] }]}
          />
        </Box>
      </Box>
      <ToolBar editorState={editorState} setEditorState={setEditorState} />
    </Box>
  )
}

export default TextEditor
