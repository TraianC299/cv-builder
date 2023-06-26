import React, { useRef, useEffect } from 'react';
import { InputStyle } from '../../../styles/global';
import Input from './Input';


type AutoResizingTextareaProps = {
  value: string;
  setValue: (value: string) => void;
  [x: string]: any;
};
const AutosizeInput = ({ value, setValue, ...restProps }:AutoResizingTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to new scroll height
    }
  }, [value]); // Run effect whenever value changes

  return (
    <Input.Wrapper>
      <Input.Label>{restProps.label}</Input.Label>
      <InputStyle
        as="textarea"
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...restProps}
        style={{ ...restProps.style, overflow: 'hidden', resize: 'none' }}
      />
    </Input.Wrapper>
  );
};

export default AutosizeInput;
