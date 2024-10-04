import { createRoot } from "react-dom/client";
import LinkedinGptChatApp from "@/apps/LinkedinGptChatApp";
import "../assets/globals.css";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  cssInjectionMode: "ui",
  runAt: "document_idle",
  async main(ctx) {
    document.addEventListener("focusin", async (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;
      if (!target.classList.contains("msg-form__contenteditable")) return;

      const ui = await createShadowRootUi(ctx, {
        name: "example-ui",
        position: "inline",

        append: async (_, ui) => {
          // Ensure the ui isnt appended twice
          ui.remove();

          const anchor = target.parentNode?.parentNode?.parentNode;
          if (!anchor) {
            console.error("failed to get anchor to load the app into.");
            return;
          }

          anchor.append(ui);
        },
        onMount: (shadowRoot) => {
          const app = document.createElement("div");
          app.id = "__linkedin-gpt__";
          shadowRoot.append(app);

          const root = createRoot(app);
          root.render(<LinkedinGptChatApp />);

          return root;
        },

        onRemove: (root) => {
          root?.unmount();
        },
      });

      ui.mount();
    });
  },
});
