<script lang="jsx">
import { defineComponent, ref, reactive, h, resolveComponent, nextTick } from "vue"
// import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import { sendMicroData, appConfigs } from '@/micro-app'
import { useStore } from "vuex"
import { useRouter } from "vue-router";
export default defineComponent({
  name: "layout",
  setup() {

    const router = useRouter();
    const store = useStore()
    let menuList = store.state.menu
    let activeIndex = ref('/')

    function handlSelect(index) {
      activeIndex.value = index
      const pathname = location.pathname.split('/')[2]
      const is = index.includes(pathname)
      const app = appConfigs.find(i => index.includes(i.path))
      if(location.hash && is && app){
        const path = app.fullPath.split('#').at(-1)
        index = path
        sendMicroData('router', { api: 'push', route: index }, app.name)
      } else {
        if(app && index.includes(app.path)){
          index = app.fullPath
        }
        router.push(index)
      }
    }

    function getActiveIndex(){
      const pathname = location.pathname.split('/')[2]
      activeIndex.value = `/${pathname}`
      return activeIndex.value
    }
    
    getActiveIndex()

    window.addEventListener('popstate', () => getActiveIndex())

    function renderIcon(icon) {
      return icon ? <el-icon>{h(resolveComponent(icon))}</el-icon> : ""
    }

    // 有特殊处理的时候需要
    function isMicro(i){
      if(i.micro){
        return i.url.split(':')[0]
      } else {
        return i.url || ''
      }
    }

    function renderMenu(menu) {
      return (
        <>
          {menu.map((i) => {
            if (i.children) {
              return (
                <>
                  <el-sub-menu index={isMicro(i)}>
                    {{
                      default: () => renderMenu(i.children),
                      title: () => (
                        <>
                          {renderIcon(i.icon)}
                          <span>{i.text}</span>
                        </>
                      ),
                    }}
                  </el-sub-menu>
                </>
              )
            } else {
              return (
                <>
                  <el-menu-item index={isMicro(i)}>
                    {renderIcon(i.icon)}
                    <span>{i.text}</span>
                  </el-menu-item>
                </>
              )
            }
          })}
        </>
      )
    }
    return () => {
      return (
        <>
          <div class="layout">
            <div class="left">
              <el-menu 
                class="el-menu-vertical-demo" 
                router={false}
                onSelect={handlSelect}
                default-active={activeIndex.value}
              >
                {renderMenu(menuList)}
              </el-menu>
            </div>
            <div class="right">
              <router-view />
            </div>
          </div>
        </>
      )
    }
  },
})
</script>
<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 220px;
    .el-menu {
      height: 100%;
    }
  }
  .right {
    flex: 1;
  }
}
</style>
