---
title: 'Photoautomat'
year: '2019'
description: 'An accessible eye-catcher that helps create lasting memories'
awards: 'Migros Kulturprozent bugNplay 2019 “Honorable Mention”'
color: '#0000FF'
gltfUrl: '/models/photobox.glb'
image: '/imakethings/Photobox_Wedding_bnp7ny.png'
---

For my sisters' wedding in 2019, I wanted to create an opportunity for the guests to take group pictures and have something to take home with them.

I came up with this compact photo booth. It was developed in a user-centered process, and is designed to be easy to use both for the operator and the end user.

The users simply need to press a button and they are automatically guided through the process of taking a picture. When a picture is taken, it is automatically printed on a roll of thermal receipt paper including a number which allows the user to grab the picture from the website after the event.

Using thermal paper makes operating the photo booth very inexpensive, which means it can be left unattended for the entire night.

The portable photo booth is powered by a raspberry pi which runs a python-based [backend](https://github.com/chdabre/photobox-backend) software and a browser with a web-based [frontend](https://github.com/chdabre/photobox-frontend) written in Vue.js.

In the top compartment, there is a Nikon DSLR and two battery-powered flashes for perfect illumination.

::youtube{id=Hpzlkna8hzI}
::

::image-carousel
---
images:
- /imakethings/P3310126_phyf6x.jpg
- /imakethings/PhotoboxThumbnail_octghf.jpg
- /imakethings/P3310136_xls087.jpg
---
::

::tech-facts
#hardware
- DSLR Camera
  - Nikon D5000
  - 2x Yungnuo Speedlite flash
- Raspberry Pi Model 4
  - 2G RAM
- 15" integrated LCD Monitor 
- 58mm integrated thermal printer 
  - optional 80mm external thermal printer
>

#software
- Vue.js Frontend running in Chromium browser
- Python backend interfaced with libgphoto2
- Automatic export of original pictures to attached USB drive
>
::
