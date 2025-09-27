export const firstDay = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]
}

export const endDay = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  .toISOString()
  .split("T")[0];
}