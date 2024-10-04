import { cn } from "@/lib/utils";
import Dialog from "./Dialog";
import IconButton from "./IconButton";
import React from "react";
import Button from "./Button";

const textboxSelector = ".msg-form__contenteditable[role='textbox']";

type TMessage = {
  prompt: string;
  reply: string;
  id: string;
};

let id = 0;

const askGpt = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
};

const Message = ({
  bySelf,
  children,
}: React.PropsWithChildren & { bySelf: boolean }) => {
  return (
    <div
      className={cn(
        "text-gray-500 p-4 rounded-xl max-w-max text-2xl",
        bySelf
          ? "bg-gray-100 self-end"
          : "bg-[hsla(214,_95%,_93%,_1)] self-start"
      )}
    >
      {children}
    </div>
  );
};

const LinkedinGptApp = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [messages, setMessages] = useState([] as TMessage[]);
  const latestReply = messages.at(-1);

  const [askGptStatus, setAskGptStatus] = useState<
    "loading" | "idle" | "error"
  >("idle");
  const isLoadingAskGptStatus = askGptStatus === "loading";

  const writeText = (text: string) => {
    const textbox = document.querySelector(textboxSelector);
    if (!textbox || !(textbox instanceof HTMLElement)) {
      return;
    }
    const placeholder = document.querySelector(".msg-form__placeholder");
    if (placeholder) {
      placeholder.remove();
    }

    textbox.innerHTML = `<p>${text}</p>`;
  };

  const getReply = async () => {
    setAskGptStatus("loading");
    try {
      const resp = await askGpt();
      setAskGptStatus("idle");
      return resp;
    } catch (e) {
      setAskGptStatus("error");
    }
  };

  return (
    <>
      <IconButton
        className="absolute bottom-[21px] right-[57px]"
        onClick={() => {
          setOpen(true);
          // writeText();
        }}
      />
      <Dialog open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-[26px]">
          {messages.map((message) => {
            return (
              <React.Fragment key={message.id}>
                <Message bySelf>{message.prompt}</Message>
                {message.reply ? (
                  <Message bySelf={false}>{message.reply}</Message>
                ) : isLoadingAskGptStatus ? (
                  <div>Loading...</div>
                ) : null}
              </React.Fragment>
            );
          })}

          <Input
            disabled={isLoadingAskGptStatus}
            className="h-[61px] text-2xl"
            placeholder="Your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
          />
          <div className="flex self-end gap-[26px]">
            {latestReply ? (
              <Button
                disabled={isLoadingAskGptStatus}
                variant="secondary"
                onClick={() => {
                  const latestMessage = messages.at(-1);
                  if (!latestMessage) return;
                  setOpen(false);
                  writeText(latestMessage.reply);
                }}
              >
                Insert
              </Button>
            ) : null}
            <Button
              disabled={isLoadingAskGptStatus}
              onClick={async () => {
                const givenPrompt = prompt;
                setMessages([
                  { prompt: givenPrompt, reply: "", id: `${id++}` },
                ]);

                setPrompt("");

                const reply = await getReply();
                if (!reply) return;

                setMessages((messages) => {
                  const newMessages = structuredClone(messages);
                  const latestMessage = newMessages.at(-1);
                  if (!latestMessage) return newMessages;
                  latestMessage.reply = reply;
                  return newMessages;
                });
              }}
            >
              {!messages.length ? "Generate" : "Regenerate"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LinkedinGptApp;
