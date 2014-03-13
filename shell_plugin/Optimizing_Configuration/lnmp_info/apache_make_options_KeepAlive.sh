#!/bin/bash

##############################
#检测MAKE安装方式的Apache主配置文件中的KeepAlive配置项信息
##############################
updatedb

ENV_PATH=../env_config

#判断是否存在Make编译安装的Apahce主配置文件，没有的话退出本脚本

locate   "httpd.conf"  |  grep  -i  "\/conf\/httpd\.conf$" |  grep  -v  "\/etc\/httpd\/conf\/httpd.conf" |  grep  -vi "\/doc"  |  grep  -vi  "\/share\/"  |  grep -vi  "ln*mp*"  

[ `echo  $?` == 0 ] ||  exit 1

#查看编译安装的apache的主配置文件的路径

CONF=`locate   "httpd.conf"  |  grep  -i  "\/conf\/httpd\.conf$" |  grep  -v  "\/etc\/httpd\/conf\/httpd.conf" |  grep  -vi "\/doc"  |  grep  -vi  "\/share\/"  |  grep -vi  "ln*mp*"  `

VALUE=`grep  -v  "^#"  $CONF |  grep  -i "KeepAlive " |  awk  '{print  $2}'`

#查看"Rpm_KeepAlive"所在的行号

LINE_NUM=`grep  -n  "Rpm_KeepAlive"   $ENV_PATH  |  awk -F:  '{print $1}'`

#在"Rpm_KeepAlive"行之后添加一行

sed  -ie  "/Rpm_KeepAlive/a \'Rpm_KeepAlive\':\'$VALUE\'" $ENV_PATH

#删除原来的"Rpm_KeepAlive"行

sed -i  ''$LINE_NUM'd'   $ENV_PATH



