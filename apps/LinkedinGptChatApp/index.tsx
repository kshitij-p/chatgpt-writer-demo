import IconButton from "@/components/IconButton";
import { MagicWandIcon } from "@/components/icons/MagicWandIcon";
import { PromptDialog } from "./PromptDialog";

const LinkedinGptChatApp = ({ onClose }: { onClose: () => void }) => {
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
      <PromptDialog
        open={open}
        setOpen={(open) => {
          setOpen(open);
          if (!open) {
            onClose();
          }
        }}
      />
    </>
  );
};

export default LinkedinGptChatApp;
