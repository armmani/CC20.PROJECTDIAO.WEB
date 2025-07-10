export const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})