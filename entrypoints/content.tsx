import { createRoot, Root } from "react-dom/client";
import LinkedinGptApp from "@/components/LinkedinGptApp";
import "../assets/globals.css";

const textBoxParentSelector = ".msg-form__msg-content-container";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*", "*://*.google.com/*"],
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
          if (window.location.href.includes("google.com")) {
            document.body.append(ui);
            return;
          }
          // Ensure the ui isnt appended twice
          ui.remove();

          const anchor = target.parentNode?.parentNode?.parentNode;
          if (!anchor) {
            console.log("failed to get anchor");
            return;
          }

          anchor.append(ui);
        },
        onMount: (shadowRoot) => {
          const app = document.createElement("div");
          app.id = "__linkedin-gpt__";
          shadowRoot.append(app);

          const root = createRoot(app);
          root.render(<LinkedinGptApp />);

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
