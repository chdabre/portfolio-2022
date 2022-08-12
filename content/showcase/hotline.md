---
title: 'The Line'
year: '2020'
description: 'A whimsical, ephemeral messenger that lives in the center of a communal space'
collaborators: 'Hanna Lisa Franz / Luca Fluri'
color: '#FF00FF'
image: '/imakethings/hotline.png'
---

My best friends and I always stay in contact. But sometimes, a small personal greeting can get lost under a pile of text messages, WhatsApp stickers, snapchats or Instagram DMs.

THE LINE makes sending short, ephemeral personal messages fun again and is a great conversation starter for parties.

The system consists of four modified rotary phones each painted in a different bright color. The antique internals were replaced with modern single board computers and the numbers on the rotary dials were replaced by emojis.

The phones connect to a central service called THE OPERATOR, which is a public Telegram bot. If a user wants to send a message to one or more of their friends, they simply send a voice memo to the Telegram bot. After choosing the recipients, the corresponding phones ring.

When the earpiece is picked up from the phone, the operator with ever-changing moods (voiced by the Google Cloud TTS service) reads the messages to them like an answering machine. Whoever answered the call can respond to each of the messages with a single emoji.

THE LINE is a whimsical and tactile way to deliver simple short messages to your best friends.

Built by Dario Breitenstein / H. Franz / L. Fluri

::tech-facts
#link
[Client GitHub](https://github.com/chdabre/hotline-client)

#hardware
- Modified PTT Phones
  - Model 70 Wall Model / Gfeller AG Bern
  - Model 70 Desk Phone / Autophon AG Solothurn
- Orange Pi Zero Gen1
    - 512M RAM / Allwinner A2 SoC
    - Custom Interface Board
- USB Power Supply
>

#software
- Node.js client software
- TTS audio generation
    - Google Cloud TTS
- Communication via WebSockets
- Automatic client updates
    - via GitHub
- Telegram Bot server
    - implemented in Node.js
- Containerized using Docker  
>
::
