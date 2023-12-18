export default defineNuxtRouteMiddleware((to, from) => {
  const store = useNuxtStore()

  if (Object.keys(store.state.user).length === 0)
    return navigateTo("/?message=noUser")
})
