示例用法

```tsx

const MenuItem = ({isActive, type, title}) => {
  return <>
    <span style={{color : isActive ? 'blue' : 'grey'}}>首页</span>
    <Icon type="home" style={{color : isActive ? 'blue' : 'grey'}} />
  </>
}
<Tabs>
  <Tab
    renderMenu={ ({isActive}) => {
      return <MenuItem isActive={isActive} type="home" title="首页" >
    }}
  >
    <h2>你好！</h2>
  </Tab>
  <Tab
    renderMenu={ ({isActive}) => {
      return <MenuItem isActive={isActive} type="discovery" title="发现" >
    }}
  >
    <table>...</table>
  </Tab>
  <Tab>
    <div>...</div>
  </Tab>
</Tabs>

```
