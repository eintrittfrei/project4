


export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  
  if (!token) return false // check if token exists 
  const splitToken = token.split('.') // split token in parts at the '.'
  console.log('decoded token', JSON.parse(atob(splitToken[1]))) // decode with atob
  if (splitToken.length < 3) return false // check its def 3 parts to it if yes return 
  return JSON.parse(atob(splitToken[1]))
  

}