import { Tabs } from "@huatian/components";
import { Discovery } from "../components/Discovery";
import { Match } from "../components/Match";

const { Tab } = Tabs

export const Home = () => {
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
        <Tabs scrollBehavior='body'>
            <Tab
                renderMenu={ ({isActive}) => {
                    return <MenuItem isActive={isActive} type="home" title="发现" />
                }}
            >
                <Discovery />
            </Tab>
            <Tab
                renderMenu={ ({isActive}) => {
                    return <MenuItem isActive={isActive} type="discovery" title="社交" />
                }}
            >
                <Match />
            </Tab>
            <Tab
                renderMenu={ ({isActive}) => {
                    return <MenuItem isActive={isActive} type="discovery" title="消息" />
                }}
            >
                <h2>你好！消息</h2>
            </Tab>
        </Tabs>
    </div>
}