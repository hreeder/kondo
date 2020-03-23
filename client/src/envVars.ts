export function getAPIRoot() {
  if (process.env.REACT_APP_API_ROOT) {
    return process.env.REACT_APP_API_ROOT
  } else {
    return "https://api.kondo.err.wtf"
  }
}
