#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🦙 ULA Social Comunicación — Entorno Local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Servicios:"
echo "    TinaCMS GraphQL : http://localhost:4001/graphql"
echo "    Admin UI        : http://localhost:4321/admin/index.html"
echo "    Frontend        : http://localhost:4321"
echo ""

# Kill any lingering processes
fuser -k 9000/tcp 2>/dev/null || true
fuser -k 4001/tcp 2>/dev/null || true

# Clean exit on Ctrl+C
cleanup() {
  echo ""
  echo "  ⏹️  Deteniendo servidores..."
  fuser -k 9000/tcp 2>/dev/null || true
  fuser -k 4001/tcp 2>/dev/null || true
  fuser -k 4321/tcp 2>/dev/null || true
  exit 0
}
trap cleanup INT TERM

# Start both servers using the existing dev script (tinacms dev -c "astro dev")
cd "$ROOT"
pnpm dev
