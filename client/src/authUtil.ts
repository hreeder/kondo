export function getLoginRedirectUrl(): string {
  const urlParts = window.location.href.split('/');
  return encodeURIComponent(
    `${urlParts[0]}//${urlParts[2]}/auth/discord/callback`
  );
}
