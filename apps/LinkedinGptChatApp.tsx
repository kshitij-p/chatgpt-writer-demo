import { cn } from "@/lib/utils";
import Dialog from "@/components/Dialog";
import IconButton from "@/components/IconButton";
import React from "react";
import Button from "@/components/Button";
import { SendIcon } from "@/components/icons/SendIcon";
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { MagicWandIcon } from "@/components/icons/MagicWandIcon";
import { ChatGptApi } from "@/lib/api";
import DownArrowIcon from "@/components/icons/DownArrowIcon";

const textboxSelector = ".msg-form__contenteditable[role='textbox']";

type Conversation = {
  prompt: string;
  reply: string;
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

const PromptDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [prompt, setPrompt] = useState("");

  const [conversation, setConversation] = useState<Conversation | undefined>();
  const mustRegenerate = !!conversation;

  const [error, setError] = useState("");
  const [validateOnInput, setValidateOnInput] = useState(false);

  const [askGptStatus, setAskGptStatus] = useState<
    "loading" | "idle" | "error"
  >("idle");
  const isLoadingAskGptStatus = askGptStatus === "loading";

  const insertIntoTextbox = (text: string) => {
    const textbox = document.querySelector(textboxSelector);

    if (!textbox || !(textbox instanceof HTMLElement)) {
      return;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.setData("text/plain", text);

    const pasteEvent = new ClipboardEvent("paste", {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true,
    });

    textbox.dispatchEvent(pasteEvent);
  };

  const getReply = async () => {
    setAskGptStatus("loading");
    try {
      const resp = await ChatGptApi.ask();
      setAskGptStatus("idle");
      return resp;
    } catch (e) {
      setAskGptStatus("error");
    }
  };

  const validateInput = (value: string) => {
    if (!value) {
      setError("Cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-[26px]">
        {conversation ? (
          <>
            <Message bySelf>{conversation.prompt}</Message>
            {conversation.reply ? (
              <Message bySelf={false}>{conversation.reply}</Message>
            ) : isLoadingAskGptStatus ? (
              <div>Loading...</div>
            ) : null}{" "}
          </>
        ) : null}

        <div className="flex flex-col gap-1">
          <Input
            className="h-[61px] text-2xl text-gray-500 placeholder:text-gray-300"
            disabled={isLoadingAskGptStatus}
            placeholder="Your prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.currentTarget.value);
              if (validateOnInput) {
                validateInput(e.currentTarget.value);
              }
            }}
          />
          {error ? (
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          ) : null}
        </div>
        <div className="flex self-end gap-[26px]">
          {conversation ? (
            <Button
              className="gap-3"
              disabled={isLoadingAskGptStatus}
              variant="secondary"
              onClick={() => {
                setOpen(false);
                insertIntoTextbox(conversation.reply);
              }}
            >
              <DownArrowIcon />
              <span>Insert</span>
            </Button>
          ) : null}
          <Button
            className={cn(mustRegenerate ? "gap-4" : "gap-[10px]")}
            disabled={isLoadingAskGptStatus}
            onClick={async () => {
              setValidateOnInput(true);
              if (!validateInput(prompt)) {
                return;
              }
              const givenPrompt = prompt;
              setConversation({
                prompt: givenPrompt,
                reply: "",
              });

              setPrompt("");

              const reply = await getReply();
              if (!reply) return;

              setConversation((curr) => {
                if (!curr) return { prompt: givenPrompt, reply };
                return { ...curr, reply };
              });
              setValidateOnInput(false);
            }}
          >
            {!mustRegenerate ? <SendIcon /> : <RefreshIcon />}
            <span>{!mustRegenerate ? "Generate" : "Regenerate"}</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const LinkedinGptChatApp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        className="absolute bottom-[21px] right-[57px]"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MagicWandIcon />
      </IconButton>
      <PromptDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default LinkedinGptChatApp;
