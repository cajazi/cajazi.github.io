export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 80; // matches sticky header height
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition =
    elementPosition + window.scrollY - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
