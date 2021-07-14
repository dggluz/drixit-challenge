export const saveToken = (jwt: string) =>
    sessionStorage.setItem('jwt', jwt)
;

export const getToken = () =>
    sessionStorage.getItem('jwt')
;

export const clearToken = () =>
    sessionStorage.removeItem('jwt')
;
