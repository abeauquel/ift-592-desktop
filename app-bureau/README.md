app-bureau

#install bluetooth on linux
````
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
````
#Install package
````
npm install
````
#Run app
````
npm start
````

#rfcomm on linux in cmd:
Avoir pair au moins une fois l'appareil

###run script setupRFCOMM.sh then startRFCOMM.sh

Restart BlueZ in compatibility mode
Rsdptool usually does not work otherwise
````
sudo rfkill block bluetooth
sudo killall bluetoothd
sudo bluetoothd -C &
sudo rfkill unblock bluetooth
````
Create a new serial port to connnect to
NOTE: The command worked if it printed
"Serial Port service registered"
If it printed nothing then it did not work
````
sudo sdptool add sp
````

````
sudo rfcomm listen /dev/rfcomm0 0
````
