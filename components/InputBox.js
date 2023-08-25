import * as React from 'react';
import { TextInput } from 'react-native-paper';

const InputBox = (props) => {
  const { autoComplete, placeHolder, onChange } = props;
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label={placeHolder}
      value={text}
      onChange={onChange}
      onChangeText={text => setText(text)}
      autoComplete={autoComplete}
    />
  );
};

export default InputBox;