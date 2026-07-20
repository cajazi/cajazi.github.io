export function isValidPlayStoreUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      url.hostname === "play.google.com" &&
      url.pathname === "/store/apps/details" &&
      Boolean(url.searchParams.get("id")?.trim())
    );
  } catch {
    return false;
  }
}
