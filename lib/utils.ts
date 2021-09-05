export function isPro(subscriptionExpires: number) {
  if (!subscriptionExpires) return false

  return subscriptionExpires > Date.now()
}