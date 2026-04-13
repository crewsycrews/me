---
title: Remote connection to local network without public gateway
date: 2026-04-13
description: Raspberry Pi and Tailscale to the rescue!
---


## Task
Be able to connect to a remote local network.

## Purpose
For example, to manage remote devices such as routers, WiFi access points, etc.

## Constraints
There is no working host and no public IP.

## My Solution

1. Buy Raspberry Pi 4.

2. Prepare the device:
   - Install Raspberry Pi OS Lite. *Lite is important to avoid unnecessary load since we don’t need a GUI (X server).*
   - Make sure the device is connected to Raspberry Pi Connect so it’s always reachable as long as it has internet access.
   - Install Tailscale (https://tailscale.com/) and connect it to your account.

3. On-site setup:
   - Connect the Raspberry Pi via Ethernet (RJ-45). I chose a wired connection to ensure stability and avoid connectivity loss.

4. The most important part:
    ```bash
    tailscale up --advertise-routes=192.168.x.x/24
    ```
   - This shares the local subnet with Tailscale clients, allowing access to devices like routers (e.g., 192.168.1.1) within that network.

5. In the Tailscale admin panel:
   - Enable the route via **Edit Route Settings → Subnet routes** to grant access to the subnet.

6. Voilà!
   - You can now connect to the local network where your Raspberry Pi is deployed.

---

**P.S.**  
It’s not always 100% stable — sometimes devices need to be pinged within the Tailscale network so they can discover each other. But overall, the task is solved.
