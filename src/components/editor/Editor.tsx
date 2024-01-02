import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { useThemeContext } from '../../contexts/ThemeContext';

export interface EditorProps {
  initialContent?: string;
  onChange: (content: string, editor: any) => void;
}

export const Editor = (props: EditorProps) => {
  const { theme } = useThemeContext();
  const { initialContent, onChange } = props;

  const handleEditorChange = (content: string, editor: any) => {
    onChange(content, editor);
  };

  return (
    <>
      <TinyMceEditor tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        init={{
          plugins: 'preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          imagetools_cors_hosts: [
            'localhost:5173',
            'localhost:8080',
            '26.44.49.6:5173',
            '26.44.49.6:8080'
          ],
          menubar: 'edit view insert format',
          toolbar: 'undo redo | bold italic underline strikethrough superscript subscript | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist table | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview wordcount code | insertfile image media template link anchor codesample | ltr rtl | help',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          importcss_append: true,
          file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
          },
          templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image imagetools table',
          skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: theme === 'dark' ? 'dark' : 'default',
          promotion: false
        }}
        initialValue={initialContent}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}