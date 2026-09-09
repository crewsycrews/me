---
title: "A developer somehow ends up running hotel IT. Part 1: Replacing a server CPU"
date: 2026-09-04
description: "A late-night SuperMicro server upgrade: a Xeon Gold 6138, going from 4 cores to 20, and a nervous wait for the first boot."
---

There's a hotel whose infrastructure I've somehow ended up maintaining for the past six months, since April this year.

Sometime in May, after a month of getting my bearings, it became clear that one of the SuperMicro servers could use an upgrade.

I'm actually a fullstack developer.

So, naturally, a little while later I found myself figuring out:

- what socket it had;
- which Xeons the motherboard supported;
- whether it needed a BIOS update;
- whether the cooling could handle it;
- and which CPU was even worth buying for this ancient machine.

I picked a CPU. To my surprise, a processor for this platform from 2017 (or was it 2018?) cost just 4,000 rubles (?!). An _Intel(R) Xeon(R) Gold 6138 CPU @ 2.00GHz_. And it would give me almost five times the CPU capacity. From 4 cores to 20. Not a bad upgrade, right? We also picked up some more RAM: we had 64 GB and were aiming for around 190 GB. Order placed.

Then came the especially wonderful part: someone also had to physically replace the CPU and memory in the server.

That someone, of course, turned out to be me as well.

The server runs Proxmox with all the software the hotel needs. So you can't just shut it down in the middle of a workday. Or on a weekend, for that matter. It's a hotel, after all. 😅

So there I was at 3 a.m.: server taken apart, heatsink removed, old Xeon out, new one in, thermal paste applied, server put back together.

I pressed the power button. Wiped the sweat off my forehead like that pilot in the famous GIF trying to land a plane.

For some reason, those few seconds before anything appeared on the monitor were far more nerve-racking than any `docker stack deploy`.

It booted.

And just like that, upgrading server Xeons quietly became part of my stack.

I've attached photos of the old processor being removed. Ba-dum-tss. Unfortunately, the whole machine was covered in construction dust because someone had drilled a hole in the wall right above the server to run some cables or pipes. I vacuumed it as best I could, but didn't take an "after" photo: I just wanted to get it back together and check that it worked.

![Replacing the server CPU](/assets/images/blog/hotel-admin/server-cpu-1.jpg)
