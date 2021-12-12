#!/bin/bash

#sudo rfcomm watch /dev/rfcomm0 0
sudo stdbuf -i0 -o0 -e0 rfcomm listen /dev/rfcomm0 0