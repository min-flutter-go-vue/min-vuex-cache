# min-vuex-cache

解决 `vue` 在使用 `vuex` 刷新页面导致 `vuex` 数据丢失问题

# 特性

- 在 `mutation` 时自动根据配置的存储条件存储状态
- 在初始化和页面刷新时会从对应的 `storage` 中获取数据合并 `store` 
- 存储对象是按模块为单位
- 目前仅支持 `localStorage` `sessionStorage`

# 注意

- 存储 `store` 中的状态的唯一方法是提交 `mutation`

# 安装

```
npm i @min_flutter_go_vue/min-vuex-cache
```

# 使用方法

目录结构如下

---- store

​	---- modules

​		---- test1.js

​		---- test2.js

​	---- index.js

`index.js` 文件内容

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { MinVuexCache, aider } from '@min_flutter_go_vue/min-vuex-cache'

Vue.use(Vuex)

const { modules, L, S } = aider('./modules')

export default new Vuex.Store({
  modules,
  plugins: [MinVuexCache({ L, S })]
})
```

`test1.js` 文件内容

```js
export default {
  namespaced: true,
  cache: 'L',

  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    getCount (state) {
      return state.count
    }
  }
}
```

`test2.js` 文件内容

```js
export default {
  namespaced: true,
  cache: 'S',

  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    getCount (state) {
      return state.count
    }
  }
}
```

# 配置项

- MinVuexCache([options])
  - key <String>: 用于存储状态的密钥（默认值：MinVuexCache）
  - L <Array>: localStorage 储存的列表
  - S <Array>: sessionStorage 储存的列表
- aider(path)
  - path <String>: 模块的路径

# 说明

- aider：扫描指定的文件夹（应该指向 vuex modules 文件夹），生成对应的 modules 和 L 、S
- 上面的 test1.js 和 test2.js 中多了一个属性 cache，cache就是指定这个模块是使用那种存储
- 如果模块没有 cache 属性就是不做任何处理（不就行缓存）