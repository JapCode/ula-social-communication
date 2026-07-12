#!/usr/bin/env bash
set -e
ROOT="$(dirname "$0")/.."

# Files that have pages2 counterparts (will be disabled)
MIGRATED_FILES=(
  "src/pages/contact.astro"
  "src/pages/program/index.astro"
  "src/pages/program/history.astro"
  "src/pages/program/mission.astro"
  "src/pages/program/graduate-profile.astro"
  "src/pages/admission/process.astro"
  "src/pages/admission/requirements.astro"
  "src/pages/academics/index.astro"
  "src/pages/academics/curriculum.astro"
  "src/pages/academics/course-content.astro"
  "src/pages/academics/internships.astro"
  "src/pages/academics/research.astro"
  "src/pages/student-life/index.astro"
  "src/pages/student-life/association.astro"
  "src/pages/student-life/groups.astro"
  "src/pages/student-life/community.astro"
  "src/pages/student-life/events.astro"
  "src/pages/alumni/index.astro"
  "src/pages/alumni/testimonials.astro"
  "src/pages/alumni/continuing-education.astro"
  "src/pages/portfolio/index.astro"
  "src/pages/portfolio/magazine.astro"
  "src/pages/portfolio/media-lab.astro"
)

case "${1:-}" in
  disable)
    echo "Disabling old page routes..."
    for f in "${MIGRATED_FILES[@]}"; do
      if [ -f "$ROOT/$f" ]; then
        mv "$ROOT/$f" "$ROOT/$f.bak"
        echo "  ✗ $f → $f.bak"
      fi
    done
    echo "Done. Start 'astro dev' to see block-based pages."
    ;;
  enable)
    echo "Restoring old page routes..."
    for f in "${MIGRATED_FILES[@]}"; do
      if [ -f "$ROOT/$f.bak" ]; then
        mv "$ROOT/$f.bak" "$ROOT/$f"
        echo "  ✓ $f restored"
      fi
    done
    echo "Done. Old routes are back."
    ;;
  *)
    echo "Usage: $0 {disable|enable}"
    echo ""
    echo "  disable   — Hide old route files so the catch-all renders block pages"
    echo "  enable    — Restore old route files"
    ;;
esac
