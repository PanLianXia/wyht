import { Page } from "../components/Page";
import { Tabs } from "../components/tabs";

const { Tab } = Tabs

export const TabsExample01 = () => {
    const MenuItem = ({isActive, type, title}: {
        isActive: Boolean,
        type: string,
        title: string
    }) => {
        return <>
          <span style={{color : isActive ? 'blue' : 'grey'}}>{title}</span>
          {/* <Icon type="home" style={{color : isActive ? 'blue' : 'grey'}} /> */}
        </>
      }
    return <div>
        <h2>Tabs示例</h2>
        <Page>
            <Tabs scrollBehavior='inner'>
                <Tab
                    renderMenu={ ({isActive}) => {
                        return <MenuItem isActive={isActive} type="home" title="首页" />
                    }}
                >
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                    <h2>你好！首页</h2>
                </Tab>
                <Tab
                    renderMenu={ ({isActive}) => {
                        return <MenuItem isActive={isActive} type="discovery" title="发现" />
                    }}
                >
                    <h2>你好！发现</h2>
                </Tab>
            </Tabs>
        </Page>
    </div>
}