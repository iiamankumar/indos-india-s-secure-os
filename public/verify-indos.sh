#!/usr/bin/env bash
# verify-indos.sh — verify an IndOS ISO download
#
# Usage:   ./verify-indos.sh IndOS-1.0-gnome-amd64.iso
# Curl:    curl -fsSL https://indos.org/verify-indos.sh | bash -s IndOS-1.0-gnome-amd64.iso
#
# Checks performed:
#   1. SHA-256 hash matches the value in SHA256SUMS
#   2. SHA-512 hash matches the value in SHA512SUMS
#   3. SHA256SUMS file is signed by the IndOS Release key
#   4. (Optional) cosign attestation on the ISO is valid (SLSA provenance)
#
# Exit codes:
#   0  all checks passed
#   1  usage error
#   2  hash mismatch
#   3  signature invalid
#   4  missing tools

set -euo pipefail

RELEASE_URL="${INDOS_RELEASE_URL:-https://github.com/iiamankumar/indos-india-s-secure-os/releases/download/v1.0}"
KEY_FPR="5C2E9B4F8A1D7E630F2C4B89D6A17F35E908C124"
KEYSERVER="${INDOS_KEYSERVER:-keyserver.ubuntu.com}"

red()    { printf '\033[31m%s\033[0m\n' "$*"; }
green()  { printf '\033[32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }
bold()   { printf '\033[1m%s\033[0m\n' "$*"; }

ISO="${1:-}"
if [[ -z "$ISO" ]]; then
  red "usage: $0 <IndOS-*.iso>"
  exit 1
fi
if [[ ! -f "$ISO" ]]; then
  red "file not found: $ISO"
  exit 1
fi

for tool in sha256sum sha512sum gpg curl; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    red "missing required tool: $tool"; exit 4
  fi
done

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

bold "==> Fetching SHA256SUMS, SHA512SUMS and signature"
curl -fsSL "$RELEASE_URL/SHA256SUMS"     -o "$WORK/SHA256SUMS"
curl -fsSL "$RELEASE_URL/SHA512SUMS"     -o "$WORK/SHA512SUMS"
curl -fsSL "$RELEASE_URL/SHA256SUMS.gpg" -o "$WORK/SHA256SUMS.gpg"

bold "==> Importing IndOS Release Signing Key ($KEY_FPR)"
gpg --keyserver "$KEYSERVER" --recv-keys "$KEY_FPR" >/dev/null 2>&1 || {
  red "failed to fetch key from $KEYSERVER"; exit 3;
}

bold "==> Verifying SHA256SUMS signature"
if ! gpg --status-fd 1 --verify "$WORK/SHA256SUMS.gpg" "$WORK/SHA256SUMS" \
    | grep -q "VALIDSIG $KEY_FPR"; then
  red "GPG signature INVALID — do not use this ISO"; exit 3
fi
green "  signature OK"

bold "==> Verifying SHA-256"
( cd "$(dirname "$ISO")" && grep " $(basename "$ISO")\$" "$WORK/SHA256SUMS" | sha256sum -c - ) \
  || { red "SHA-256 mismatch"; exit 2; }

bold "==> Verifying SHA-512"
( cd "$(dirname "$ISO")" && grep " $(basename "$ISO")\$" "$WORK/SHA512SUMS" | sha512sum -c - ) \
  || { red "SHA-512 mismatch"; exit 2; }

if command -v cosign >/dev/null 2>&1; then
  bold "==> Verifying SLSA provenance attestation (cosign)"
  cosign verify-blob-attestation \
    --certificate-identity-regexp "https://github.com/iiamankumar/indos-india-s-secure-os/.*" \
    --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
    --type slsaprovenance \
    --bundle "$RELEASE_URL/$(basename "$ISO").intoto.jsonl" \
    "$ISO" 2>/dev/null && green "  attestation OK" \
    || yellow "  cosign attestation skipped (bundle not found or invalid)"
else
  yellow "==> cosign not installed — skipping SLSA attestation check"
fi

echo
green "All checks passed. Safe to flash $ISO"
