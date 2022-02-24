import React from 'react';

import Editor from '@uiw/react-md-editor';

function MdEditor({ value, setValue, className }) {
  return (
    <div className={className}>
      <Editor
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

function Preview({ value, className }) {
  return (
    <div className={className}>
      <Editor.Markdown source={value} />
    </div>
  );
}

MdEditor.Preview = Preview;

export default MdEditor;
