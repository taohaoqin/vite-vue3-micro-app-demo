<script lang="jsx">
import { defineComponent, ref, reactive, h, resolveComponent } from "vue"
import { useStore } from "vuex"
import { isMicroApp } from '@/micro-app'
export default defineComponent({
  name: "layout",
  setup() {
    const store = useStore()
    let useLayout = ref(isMicroApp())

    let menuList = store.state.menu

    function handlSelect(index) {
      console.log(index, "select")
    }

    function renderIcon(icon) {
      return icon ? <el-icon>{h(resolveComponent(icon))}</el-icon> : ""
    }

    function renderMenu(menu) {
      return (
        <>
          {menu.map((i) => {
            if (i.children) {
              return (
                <>
                  <el-sub-menu index={i.url || ""}>
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
                  <el-menu-item index={i.url}>
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
          {!useLayout.value ? <div class="left">
              <el-menu 
                class="el-menu-vertical-demo" 
                router={true}
                onSelect={handlSelect}
              >
                {renderMenu(menuList)}
              </el-menu>
            </div> : ''}
            
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
