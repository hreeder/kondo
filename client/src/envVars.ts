export function getAPIRoot(): string {
  if (process.env.REACT_APP_API_ROOT) {
    return process.env.REACT_APP_API_ROOT;
  }

  return 'https://api.kondo.err.wtf';
}
