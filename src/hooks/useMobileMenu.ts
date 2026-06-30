import { useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return { open, toggle, close };
}
