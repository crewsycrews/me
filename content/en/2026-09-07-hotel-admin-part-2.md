---
title: "A developer somehow ends up running hotel IT. Part 2: Replacing the core switches and trying not to break anything"
date: 2026-09-07
description: "Replacing the core switches with Eltex, mapping the network, unexpected BPDUs, and an old HPE temporarily serving as an adapter."
---

At some point, I decided that before adding a separate VLAN for guest Wi-Fi, I should probably sort out the network core itself. At the time, it consisted of several generations of `D-Link` switches, an old `HPE 1910-24`, and a `Zyxel GS1900-24HP`. Some of the equipment had a clear purpose. Some of it had apparently just ended up between two other switches at some point in history and stayed there under the principle of "if it works, don't touch it."

For replacements, I had:

- an inherited `Eltex MES2428P` that was sitting powered off;
- two new `Eltex MES2424P` switches.

The plan was to replace the `Zyxel` with the `Eltex MES2428P` from the server room, replace the two core `D-Link` switches with the new `Eltex MES2424P` units, remove part of the old chain entirely, and move the client connections from the old `HPE` to the `Zyxel GS1900-24HP` I already had.

Sounds simple: save the configs → move the cables → done. Of course not.

First, I discovered that I needed to work out where all those cables actually went. Some port labels were out of date, some devices had no useful names, and some connections existed only in old diagrams that had long since stopped matching reality. So before replacing anything, I pieced the network back together:

SNMP, LLDP, MAC address tables, DHCP, ARP, port status, and a bit of walking between racks. AI tools helped a lot here, because parsing SNMP data while staring at keys like `1.3.6.1.2.1.1.5.0` (OIDs) is quite the treat.

Gradually, a table took shape:

old port → actual device → VLAN → new port.

A cable plugged into a disabled port couldn't automatically be considered unnecessary. But moving it blindly wasn't an option either.

The old VLANs were a separate source of entertainment. The previous switches still had several VLANs without a single active device in them. I wasn't going to copy them onto the new hardware just because they'd once existed. Only networks that were actually in use made it into the new configuration.

I initially configured the `Eltex MES2424P` switches separately from the production network. Hostnames, LLDP, RSTP, root bridge priorities, access ports, tagged and untagged VLANs, PVID, ingress filtering.

On paper, it all sounds fairly straightforward. Well, once you know what all those abbreviations mean.

In practice, even connecting to the console turned into a quest of its own: an FTDI adapter, 115200 8N1, `screen` on macOS, and a certain number of question marks instead of a proper command prompt. In the end, I used a utility called `dhcpmasque` on my Mac to act as a `DHCP` server when connected to the switch and assign it the IP address I wanted based on its `MAC` address. I found that address by catching the switch's `DHCPREQUEST` during startup with `tcpdump`. Although the `Eltex` documentation said the switches shipped with a static address, that wasn't the case: they were waiting for a `DHCPACK`, so I had to improvise.

A very reassuring start to the migration.

I didn't configure static management addresses on the new switches. Instead, I prepared DHCP reservations so that once an old device was disconnected, its replacement could take over the same address.

The actual migration happened in stages.

1. First, the main uplink.
2. Then, check management access, LLDP, and connectivity.
3. Only after that, move the remaining connections.

The old switches weren't reset or taken apart. They stayed ready as a physical rollback option: if anything went wrong, put the labelled cables back. As with the previous post, these switches could only be replaced at night: they were the core switches, and taking them offline would cut off the entire hotel's network.

Something did, of course, go wrong.

After moving one of the external links, the internet started dropping out. It turned out the provider was sending `BPDUs`: `STP` packets that network equipment uses to work out who's in charge. The new Eltex dutifully processed them through RSTP and, at some point, blocked the port because it considered itself the "root" switch, meaning the one in charge. And under the Spanning Tree Protocol rules, only one switch can be in charge. "There can be only one!"

I'd forgotten that I had enabled BPDU blocking on the provider-facing port of the old D-Link. 🙈 I repeated that bit of magic on the Eltex, and the uplink promptly came back. `RSTP` stayed enabled on the internal connections as before to prevent accidental network loops.

Then another surprise turned up. The cable leading to one of the access switches, a `UniFi US8`, worked fine through the old HPE, but wouldn't establish a link at all when connected directly to the new Eltex or the Zyxel. I could have spent a long time blaming equipment compatibility. But the fact that the connection through the HPE only came up at 100 Mbps was a pretty clear hint that the physical cable run was the problem: the termination, the patch panel, or missing wire pairs. I didn't have a crimping tool, a punch-down tool, or an Ethernet tester with me, so the old `HPE` had to stay in the network temporarily. Almost everything else had already been moved off it, but the switch kept working as a rather large, power-hungry adapter between one cable and the UniFi. In the end, the core D-Link switches were replaced with `Eltex MES2424P` units, the client connections moved to the `Zyxel GS1900-24HP`, an unnecessary intermediate switch was removed, and the main nodes were left with proper fibre links between them.

For me, the biggest result wasn't even the new switches. After this migration, the network finally had a diagram I could more or less trust.

With real ports, VLANs, uplinks, exceptions, and a clear rollback plan. With that done, I could move on to the next tricky task: putting guest Wi-Fi on its own VLAN. Stay tuned.

![Anonymised network diagram showing ports, VLANs, and equipment models; labels are in Russian](/assets/images/blog/hotel-admin/network-map.png)

![Eltex MES2428P switch](/assets/images/blog/hotel-admin/eltex-mes2428p.png)
