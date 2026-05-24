# IndOS live-build configurations

Two editions, each a self-contained [`live-build`](https://manpages.ubuntu.com/manpages/noble/en/man7/live-build.7.html) project consumed by `.github/workflows/build-iso.yml`.

```
live-build/
├── gnome/   # IndOS GNOME — full desktop, ~4.2 GB ISO
└── xfce/    # IndOS XFCE  — lightweight, ~2.6 GB ISO
```

Each directory contains:

- `auto/config` — passed to `lb config` (Ubuntu 24.04 "noble" base, amd64, hybrid ISO).
- `config/package-lists/indos.list.chroot` — packages installed into the live system (desktop, 12 Indian language packs, Indic fonts, IBus, AppArmor, UFW, LUKS).

## Local build (Linux host with ~30 GB free disk)

```bash
sudo apt install live-build debootstrap squashfs-tools xorriso
cd live-build/gnome     # or xfce
sudo lb clean --purge
sudo lb config
sudo lb build           # ~30–60 min, produces live-image-amd64.hybrid.iso
```

## CI build

Push a tag (`git tag v1.0 && git push --tags`) and the workflow builds both editions in parallel, GPG-signs the ISOs, and attaches them to the matching GitHub Release. See the workflow file for the three required repo secrets.

## Customising further

- **Branding** — drop wallpapers / Plymouth themes into `config/includes.chroot/usr/share/`.
- **Preseeded settings** — add a `config/hooks/live/9999-indos.hook.chroot` shell script; it runs inside the chroot after package install.
- **Extra repositories** — drop `.list` files into `config/archives/`.
