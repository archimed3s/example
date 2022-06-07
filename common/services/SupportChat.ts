declare global {
  interface Window {
    // eslint-disable-next-line camelcase
    chatButton?: {
      onClick: () => void;
    };
  }
}

export const onSupportChatOpen = () => {
  if (window && window.chatButton) {
    window.chatButton.onClick();
  }
};
