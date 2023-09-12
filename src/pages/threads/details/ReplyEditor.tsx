import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Editor } from '../../../components/editor/Editor';

interface ReplyEditorProps {
  initialContent?: string;
  onSend: (content: string) => void;
  onCancel?: () => void;
}

export const ReplyEditor: FC<ReplyEditorProps> = (props: ReplyEditorProps) => {
  const { initialContent, onSend, onCancel } = props;
  const [content, setContent] = useState<string>(initialContent ?? '');

  const handleSend = () => {
    onSend(content);
    setContent('');
  };

  const handleCancel = () => {
    setContent('');
    onCancel?.();
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      py: 2
    }}>
      <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2 }}>
        <Editor initialContent={initialContent} onChange={handleContentChange}/>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          mt: 2
        }}>
          <Button sx={{ ml: 2 }} variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleSend}>Send</Button>
          <Button sx={{ ml: 2 }} variant="contained" color="secondary" startIcon={<CloseIcon />} onClick={handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
}