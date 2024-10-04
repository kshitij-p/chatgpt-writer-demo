import { useLayoutEffect } from "react";

const Dialog = ({
  open,
  setOpen,
  children,
}: React.PropsWithChildren & {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const diagRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (!diagRef.current) return;

    if (open && !diagRef.current.open) {
      diagRef.current.showModal();
    } else if (!open && diagRef.current.open) {
      diagRef.current.close();
    }
  }, [open, setOpen]);

  return (
    <>
      <dialog
        className="[&::backdrop]:bg-[hsla(240,_16%,_6%,_0.2)] h-max w-max bg-[hsla(210,_20%,_98%,_1)] text-black rounded-[15px] max-w-[90vw]"
        onClose={() => {
          setOpen(false);
        }}
        onClick={(e) => {
          if (!diagRef.current || !e.target || !(e.target instanceof Node))
            return;
          if (diagRef.current === e.target) {
            setOpen(false);
          }
        }}
        ref={diagRef}
      >
        <div className="h-full bg-[hsla(210,_20%,_98%,_1)] p-[26px] w-[870px]">
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Dialog;
