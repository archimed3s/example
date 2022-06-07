import styled from '@emotion/styled';

import { Button } from '@components/Button/Button';

export const StyledButton = styled(Button)`
  & > * {
    pointer-events: none;
  }
`;

export const DropArea = styled.div`
  position: relative;
`;

export const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
`;

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  /* custom dashed border */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%234E577A' stroke-width='5' stroke-dasharray='30%2c20' stroke-dashoffset='13' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 10px;
`;
