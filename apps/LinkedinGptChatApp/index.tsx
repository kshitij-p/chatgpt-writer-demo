import IconButton from "@/components/IconButton";
import { MagicWandIcon } from "@/components/icons/MagicWandIcon";
import { PromptDialog } from "./PromptDialog";

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
