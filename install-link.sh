#! /bin/sh

# 在wyht目录下，输出.;
# 在packages目录下，输出..;
echo $(dirname $0)

cd $(dirname $0)

# 获取当前工作路径
# 在packages目录下是：/d/wangyi/projects/wyht/packages
# 由于上边已经cd到了wyht目录，所以结果是/d/wangyi/projects/wyht
BASE=$(pwd)


# 开发中，两个项目或多个项目之间相互依赖时，用 yarn link连接，
# 例如：我们现在有项目B，B中利用npm / yarn 包管理器 引入了 包 A，A是我们自己开发封装的组件，
# 我们修改了组件A的内容，在还没有重新发布组件A 的时候，想要在项目B 中 检查组件A修改的是否正确，
# 这个时候就需要用到yarn link
cd $BASE/packages/huatian-utils
yarn link

cd $BASE/packages/huatian-domain
yarn link
yarn link @huatian/utils

cd $BASE/packages/huatian-rest
yarn link
yarn link @huatian/domain

cd $BASE/packages/huatian-components
yarn link
yarn link @huatian/utils
yarn link @huatian/domain

cd $BASE/packages/huatian-app
yarn link @huatian/components
yarn link @huatian/utils
yarn link @huatian/rest
yarn link @huatian/domain

cd $BASE/packages/huatian-service
yarn link @huatian/domain
yarn link @huatian/utils
