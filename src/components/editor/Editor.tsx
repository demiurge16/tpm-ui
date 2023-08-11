import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';

export interface EditorProps {
  onEditorChange: (content: string, editor: any) => void;
}

export const Editor = (props: EditorProps) => {
  const { onEditorChange } = props;

  return (
    <>
      <TinyMceEditor tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        init={{
          skin: 'oxide-dark',
          content_css: 'dark',
          icons: 'material',
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onEditorChange}
      />
    </>
  );
}