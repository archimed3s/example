import { Dispatch, ReactElement, ReactNode, SetStateAction, useEffect } from 'react';

type SwitchProps = {
  currentStep: number;
  setNSteps: Dispatch<SetStateAction<number>>;
  children: ReactNode[];
};

export const Switch = ({ currentStep, setNSteps, children }: SwitchProps): JSX.Element => {
  const { type: StepForm, props: stepFormProps } = children?.[currentStep - 1] as ReactElement;

  useEffect(() => {
    setNSteps(children?.length);
  }, [children?.length, setNSteps]);

  return <StepForm {...stepFormProps} step={currentStep} />;
};
