#!/bin/bash
sudo rfkill block bluetooth
sudo killall bluetoothd
sudo bluetoothd -C &
sudo rfkill unblock bluetooth
sudo sdptool add sp
