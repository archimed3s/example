import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useCallback, useEffect, useRef } from 'react';

const preventDefaults = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

/*
 * input with inputProps should be always wrapped into HTMl element with containerProps
 * */

export const useFileUpload = ({
  onFileChange,
  multiple = true,
}: {
  onFileChange: (files: File[]) => void;
  multiple?: boolean;
}): {
  inputProps: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  containerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
} => {
  const dropArea = useRef<HTMLDivElement>(null);

  const handleFileChange = useCallback(
    (files: FileList | null | undefined) => {
      if (files) {
        onFileChange(Object.values(files));
      }
    },
    [onFileChange],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      const dt = e.dataTransfer;
      const { files } = dt || {};
      handleFileChange(files);
    },
    [handleFileChange],
  );

  useEffect(() => {
    const dropAreaNode = dropArea.current;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropAreaNode?.addEventListener(eventName, preventDefaults, false);
    });
    dropAreaNode?.addEventListener('drop', handleDrop, false);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropAreaNode?.removeEventListener(eventName, preventDefaults, false);
      });
      dropAreaNode?.removeEventListener('drop', handleDrop, false);
    };
  }, [handleDrop]);

  return {
    inputProps: {
      type: 'file',
      accept: 'image/*',
      onChange: (e) => handleFileChange(e.currentTarget.files),
      multiple,
    },
    containerProps: { ref: dropArea },
  };
};
