module.exports = ({ code = 200, body = {}, status = 'success' }) => {
  return {
    code,
    body,
    msg,
  }
}