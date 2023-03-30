import { FC, useState } from 'react'
import {
  EditorState,
  ContentState,
  CompositeDecorator,
  ContentBlock,
} from 'draft-js'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Document } from '../../../types'
import ToolBar from './ToolBar'
import { Link, LinkifyLink } from './Link'
import Editor from '@draft-js-plugins/editor'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import Box from '@mui/material/Box'

const linkifyPlugin = createLinkifyPlugin({ component: LinkifyLink })

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

const TextEditor: FC<Document> = ({ text }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ])

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(ContentState.createFromText(text), decorator)
  )

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
            onChange={(state) => setEditorState(state)}
            plugins={[linkifyPlugin]}
          />
        </Box>
      </Box>
      <ToolBar editorState={editorState} setEditorState={setEditorState} />
    </Box>
  )
}

export default TextEditor
