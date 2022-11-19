export const sliceToken = (token: string) : string => (token || '').replace(/Bearer\s?/, '')
