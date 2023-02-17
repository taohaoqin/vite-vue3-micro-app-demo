<script lang="jsx">
import HelloWorld from "../components/HelloWorld.vue"
import { defineComponent, ref } from "vue"
export default defineComponent({
  setup() {
    let msg = ref("moyu")
    function back(val) {
      console.log(val)
    }

    return () => {
      return (
        <>
          <div>首页</div>
          <HelloWorld msg={msg.value} onBtn={back} />
        </>
      )
    }
  },
})
</script>
