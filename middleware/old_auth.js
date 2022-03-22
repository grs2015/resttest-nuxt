export default function (context) {
  console.log('[Middleware] Check request and cookies')
  context.store.dispatch('auth/checkAuth', context.req)
}
