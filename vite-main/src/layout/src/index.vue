<script lang="jsx">
import { defineComponent, ref, reactive, h, resolveComponent, onBeforeUnmount } from "vue"
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
    // 关闭element自动跳转路由 改为手动
    function handlSelect(index) {
      activeIndex.value = index
      // 解决子应用跳转问题以及浏览器前进后退的问题
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
    // 监听浏览器的前进后退
    window.addEventListener('popstate',  getActiveIndex)

    onBeforeUnmount(() => {
       window.removeEventListener('popstate', getActiveIndex)
    })

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
  }
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
