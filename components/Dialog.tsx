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
        className="h-max w-max max-w-[90vw] rounded-[15px] bg-[hsla(210,_20%,_98%,_1)] text-black [&::backdrop]:bg-[hsla(240,_16%,_6%,_0.2)]"
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
        <div className="h-full w-[870px] bg-[hsla(210,_20%,_98%,_1)] p-[26px]">
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Dialog;
