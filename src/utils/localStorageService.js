const localStorageService = {
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key)
      try {
        return JSON.parse(value)
      } catch {
        return value // Return raw value if not JSON
      }
    }
    return null
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
  },
  setEmailClient: (email) => {
    localStorageService.setItem('email_client', email)
  },
  getEmailClient: () => {
    return localStorageService.getItem('email_client')
  },
  setEmailPromotor: (email) => {
    localStorageService.setItem('email_promotor', email)
  },
  getEmailPromotor: () => {
    return localStorageService.getItem('email_promotor')
  },
  removeEmail: () => {
    localStorageService.removeItem('email')
  },
}

export default localStorageService
