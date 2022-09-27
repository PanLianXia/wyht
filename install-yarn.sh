#! /bin/sh

# 在wyht目录下，输出.;
# 在packages目录下，输出..;
echo $(dirname $0)

cd $(dirname $0)

# 获取当前工作路径
# 在packages目录下是：/d/wangyi/projects/wyht/packages
# 由于上边已经cd到了wyht目录，所以结果是/d/wangyi/projects/wyht
BASE=$(pwd)

projects=(huatian-app huatian-components huatian-utils huatian-rest huatian-service huatian-domain)

for project in ${projects[@]}
do
  echo "install $project"
  cd $BASE/packages/$project
  cnpm install
done
