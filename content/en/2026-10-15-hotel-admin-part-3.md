---
title: "A developer somehow ends up running hotel IT. Part 3: Moving the hotel’s guest Wi-Fi to a separate VLAN"
date: 2026-10-15
description: "Moving guest Wi-Fi to VLAN 50: Proxmox, a Linux gateway, DHCP, firewall rules, and a path through every switch to the access points."
---

When I first started figuring out the hotel's network, it turned out that pretty much everything lived on one big LAN: `192.168.0.0/23`. That's about 512 addresses. Servers, workstations, cameras, network equipment. And guest Wi-Fi too.

So someone checks into a room, connects to Wi-Fi, and technically ends up on roughly the same network as most of the hotel's infrastructure. A little worrying! I decided to move guest Wi-Fi to a separate VLAN 50 with its own `10.50.0.0/23` subnet, allowing access only to the internet.

Sounds simple:

create a VLAN → select it in UniFi → done.

Of course not. My gateway actually runs as a virtual machine in Proxmox. So first I had to pass the VLAN from the physical switch into Proxmox, add a separate network interface to the Linux gateway VM, and configure DHCP, routing, and the firewall. Then I had to carry that same VLAN through the hotel's entire physical network to every access point serving guest Wi-Fi. That was the most time-consuming part, because it meant knowing the whole network topology: which switch sits behind which, whether it's managed, and whether it supports VLAN tagging.

The path included a pretty eclectic collection of managed and unmanaged switches that I was only just starting to understand myself. So I tested everything on a single access point with a temporary SSID first, leaving the working guest network alone.

A very pleasant way to learn about tagged and untagged VLANs:

not on a lab bench, but in a working hotel with guests using the network right now.

After testing, I moved the production `Bristol-Guest` network to the new VLAN.

Guests kept their internet access but lost access to servers, workstations, cameras, telephony, and the network equipment's management interfaces. I also isolated guest devices from one another.

I think that was the moment I first realised that “I help out a bit with the hotel's infrastructure” no longer quite described the situation.

---

Previous part: [Part 2: Replacing the core switches and trying not to break anything](/en/blog/2026-09-07-hotel-admin-part-2/).
