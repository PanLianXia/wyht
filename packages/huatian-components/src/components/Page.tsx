import { defineComponent } from "vue"

export const Page = defineComponent({
  setup(_, ctx) {
    return () => {
      return <div style={{
        width : '414px',
        height  : '736px',
        border : '1px solid black',
        boxSizing : "content-box",
        position: 'relative'
      }}>
        {ctx.slots.default!()}
      </div>
    }
  }
})