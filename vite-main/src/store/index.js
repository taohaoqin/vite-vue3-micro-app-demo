import { createStore } from "vuex"

export default createStore({
  state: {
    menu: [
      {
        text: "二级菜单",
        icon: "Menu",
        url: "/secondChild/",
        children: [
          {
            text: "微前端2",
            url: "/secondChild/",
            name: 'secondChild',
            leaf: true,
          },
          {
            text: "三级菜单",
            url: "/thirdChild",
            children: [
              {
                text: "三级节点",
                url: "/thirdChild",
                name: 'thirdChild',
                leaf: true,
              },
            ],
          },
        ],
      },
      {
        text: "微前端1",
        url: "/firstChild/",
        icon: "Grid",
        name: 'firstChild',
        leaf: true,
      },
    ],
  },
  getters: {
    menu: (state) => state.menu,
  },
  mutations: {
    SET_MENU (state, menu) {
      state.menu = menu
    },
  },
  actions: {
    SET_MENU (context, menu) {
      context.commit("SET_MENU", menu)
    },
  },
})
