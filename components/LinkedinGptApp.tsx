import IconButton from "./IconButton";

const textboxSelector = ".msg-form__contenteditable[role='textbox']";

const LinkedinGptApp = () => {
  const writeText = () => {
    const textbox = document.querySelector(textboxSelector);
    if (!textbox || !(textbox instanceof HTMLElement)) {
      return;
    }
    const placeholder = document.querySelector(".msg-form__placeholder");
    if (placeholder) {
      placeholder.remove();
    }

    textbox.innerHTML = `<p>Hello</p>`;
  };

  return (
    <>
      <IconButton
        className="absolute bottom-2 right-2"
        onClick={() => {
          writeText();
        }}
      />
    </>
  );
};

export default LinkedinGptApp;
