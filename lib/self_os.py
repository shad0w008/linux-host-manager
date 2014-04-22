# -*- coding:utf-8 -*-
# 
# get the os base information

import sys
import platform
import commands
import subprocess

############### find ######################

def find_uid_0():
	# find the users that UID==0 but not root user
	userLists = commands.getoutput("""awk -F ":"   '$3==0   {print $1}'       /etc/passwd  | grep -viw   "root"  """)
	userLists = user.split('\n')
	return userLists # return user lists

def find_file_777():
	# find the 777 file or dir
	fileLists = commands.getoutput("find / -perm -777")
	fileLists = fileLists.split('\n')
	return fileLists

def find_cpu_over_use(osVersion):
	# unfinished
	if 'centos' in osVersion or 'redhat' in osVersion:
		subprocess.call('yum install -y sysstat', shell = True)
	elif 'debian' in osVersion or 'ubuntu' in osVersion:
		subprocess.call('apt-get install -y sysstat', shell = True)
	else:
		print " Not support for the current os type"

	result = subprocess.Popen('mpstat', shell = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE)
	code = sys.getfilesystemencoding()
	result = result.communicate()[0].decode(code)
	print "%r" % result

def detec_os_version():
	"""检测系统的类型，版本和架构"""
	linux_dist = platform.linux_distribution()
	machine = platform.machine()
	return [linux_dist[0].lower(), linux_dist[1], machine]

def detec_data_space():
	"""判断是否有free分区磁盘"""
	diskLists = commands.getoutput(""" fdisk  -l  |  grep -iw "^Disk"  |  grep  "/dev/"  |  grep  -vi  "\/mapper\/"  |  awk  -F  ":"   '{print  $1}'  |   awk   '{print  $2}'  |  sort  """)
	diskLists = diskLists.split('\n')
	return diskLists

def detec_disk_space():
	"""检测空间最大分区"""
	"""输出剩余空间最大的磁盘分区"""

def detec_disk_use():
	results = commands.getoutput(""" df  -k  |  egrep "[0-9]{1,3}%" | awk '{print $6,"\t", $5}'""")
	results = results.split('\n')
	diskUse = []
	for result in results:
		diskuse_item = {}
		result = result.split('\t')
		diskuse_item['partition'] = result[0]
		diskuse_item['userate'] = result[1]
		diskUse.append(diskuse_item)
	return diskUse

def detec_io_use():
	""" check io use information
	    use cmd iostat -d  to check disk IO
	"""

def detec_nopasswd_user():
	userLists = commands.getoutput(""" awk  -F  ":"  '$2==null  {print  $1}'   /etc/shadow """)
	userLists = userLists.split('\n')
	return userLists

def initialize_disk(diskName,isExist):
	"""额外磁盘端分区和挂载"""
	""" diskName 是表示剩余空间最大的磁盘，由detec_disk_space()获得"""
	""" isExist  表示是否存在额外磁盘，由detec_data_disk()获得"""
	"""返回额外磁盘挂载点"""
	


if __name__ == '__main__':
	osVersion = detec_os_version()
	#find_cpu_over_use(osVersion)
	detec_nopasswd_user()
