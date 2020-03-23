export function getLoginRedirectUrl() {
  const urlParts = window.location.href.split("/");
  return encodeURIComponent(`${urlParts[0]}//${urlParts[2]}/auth/discord/callback`);
}