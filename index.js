function MinVuexCache ({ key = 'MinVuexCache', L = [], S = [] }) {
  if (!Array.isArray(L) && !Array.isArray(S)) {
    throw new Error('L or S must be an array type')
  }
  function setState (key, state, storage) {
    return storage.setItem(key, JSON.stringify(state))
  }

  function getState (key, storage) {
    let state = storage.getItem(key)

    if (state) {
      return JSON.parse(state)
    }

    return undefined
  }
  return function (store) {
    store.replaceState(Object.assign({}, store.state, getState(key, localStorage), getState(key, sessionStorage)))

    store.subscribe((_mutation, state) => {
      let localData = {}
      let sessionData = {}

      L.forEach(item => {
        localData = Object.assign({}, localData, { [item]: state[item] })
      })
      setState(key, localData, localStorage)

      S.forEach(item => {
        sessionData = Object.assign({}, sessionData, { [item]: state[item] })
      })
      setState(key, localData, sessionStorage)
    })
  }
}

function aider (path) {
  let L = []
  let S = []
  let modules = {}
  const modulesFiles = require.context(path, true, /\.js$/)
  modulesFiles.keys().forEach(modulePath => {
    let moduleName = modulePath.replace(/^\.\/(.*)\.js$/, '$1')
    let moduleContent = modulesFiles(modulePath).default
    if (moduleContent.cache === 'L') L.push(moduleName)
    if (moduleContent.cache === 'S') S.push(moduleName)
    modules[moduleName] = moduleContent
  })

  return {
    modules,
    L,
    S
  }
}

export {
  MinVuexCache,
  aider
}
