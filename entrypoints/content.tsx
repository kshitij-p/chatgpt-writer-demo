import { createRoot, Root } from "react-dom/client";
import LinkedinGptChatApp from "@/apps/LinkedinGptChatApp";
import "../assets/globals.css";
import { ShadowRootContentScriptUi } from "wxt/client";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  cssInjectionMode: "ui",
  runAt: "document_idle",
  async main(ctx) {
    let ui: ShadowRootContentScriptUi<Root> | undefined;

    document.addEventListener("focusin", async (e) => {
      //Prevent the shadow root ui from mounting twice
      if (ui && ui.mounted) return;

      const target = e.target;

      //Check if the focused target is the linkedin DMs textbox
      if (!target || !(target instanceof Element)) return;
      if (!target.classList.contains("msg-form__contenteditable")) return;

      let anchor: ParentNode | undefined | null = null;
      const handleBlur = (e: FocusEvent) => {
        const newlyFocusedEl = e.relatedTarget;

        if (!ui || !anchor) return;

        if (newlyFocusedEl instanceof Node && anchor.contains(newlyFocusedEl)) {
          return;
        }

        const prevFocusedEl = e.target;
        if (
          prevFocusedEl instanceof Node &&
          ui.shadow.host.contains(prevFocusedEl)
        )
          return;

        ui.remove();
      };

      ui = await createShadowRootUi(ctx, {
        name: "example-ui",
        position: "inline",

        append: async (_, ui) => {
          // Ensure the ui isnt appended twice
          ui.remove();

          anchor = target.parentNode?.parentNode?.parentNode;
          if (!anchor) {
            console.error("failed to get anchor to load the app into.");
            return;
          }

          anchor.append(ui);
        },
        onMount: (shadowRoot) => {
          const app = document.createElement("div");
          app.id = "__linkedin-gpt-app-root__";
          shadowRoot.append(app);

          const root = createRoot(app);
          root.render(
            <LinkedinGptChatApp
              onClose={() => {
                ui?.remove();
              }}
            />
          );

          if (anchor) {
            document.addEventListener("focusout", handleBlur);
          }

          return root;
        },

        onRemove: (root) => {
          root?.unmount();
          document.removeEventListener("focusout", handleBlur);
        },
      });

      ui.mount();
    });
  },
});
