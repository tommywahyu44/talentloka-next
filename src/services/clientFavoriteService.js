const clientFavoriteService = {
  storageKey: 'clientFavoriteService',

  // Add SPG Code to the list
  add(spgCode) {
    if (!spgCode) return // Guard clause for empty input
    const currentList = this.get()
    if (!currentList.includes(spgCode)) {
      currentList.push(spgCode)
      localStorage.setItem(this.storageKey, JSON.stringify(currentList))
    }
    return currentList
  },

  // Remove SPG Code from the list
  remove(spgCode) {
    if (!spgCode) return // Guard clause for empty input
    const currentList = this.get()
    const updatedList = currentList.filter((code) => code !== spgCode)
    localStorage.setItem(this.storageKey, JSON.stringify(updatedList))
    return updatedList
  },

  // Get the list of SPG Codes
  get() {
    const storedList = localStorage.getItem(this.storageKey)
    return storedList ? JSON.parse(storedList) : []
  },
}

export default clientFavoriteService
