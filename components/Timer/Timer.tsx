import { useTimer } from '@hooks/useTimer';

export const Timer = ({ startSeconds }: { startSeconds?: number }) => {
  const [, { hours, minutes, seconds }] = useTimer(startSeconds);
  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  );
};
