set -e

for f in $(ls); do adb -s 192.168.0.11:5555 push $f /data/user/0/com.paulcoding.hviewer.dev/files/scripts/; done
