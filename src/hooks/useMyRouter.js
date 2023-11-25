let _router = null

function jumpTo(path) {
  _router.push(path)
}

export function useMyRouter(router) {
  _router = router
  return {
    jumpTo
  }
}
