export const ChatGptApi = {
  ask: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  },
};
