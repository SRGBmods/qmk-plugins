#!/bin/bash

################################################################################
# SignalRGB QMK Plugins - Keyboard List Generator
#
# This script scans all keyboard manufacturer directories and generates a
# comprehensive markdown file listing all supported keyboards with their
# supported formats (ANSI/ISO).
#
# Usage:
#   bash scripts/update-keyboards.sh
#   ./scripts/update-keyboards.sh
#
# Output:
#   SUPPORTED_KEYBOARDS.md (in repository root)
#
# Requirements:
#   - bash/sh
#   - standard Unix tools (find, awk, sed, sort)
#   - Read access to keyboard directories
#
################################################################################

set -e

# Get the repository root directory
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_FILE="${REPO_ROOT}/SUPPORTED_KEYBOARDS.md"

# Temporary files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

KEYBOARD_DATA="${TEMP_DIR}/keyboards.txt"

echo "Scanning for keyboards in ${REPO_ROOT}..."

# Phase 1: Scan all keyboard files and collect data
# Format: MANUFACTURER|READABLE_NAME|HAS_ANSI|HAS_ISO

find "${REPO_ROOT}" -type f -name "*.js" ! -path "*/.git/*" 2>/dev/null | while read -r file; do
    # Get manufacturer
    relative_path="${file#${REPO_ROOT}/}"
    manufacturer=$(echo "$relative_path" | cut -d'/' -f1)
    
    # Get filename without extension
    filename=$(basename "$file" .js)
    
    # Convert filename to readable format
    readable_name=$(echo "$filename" | sed 's/_/ /g' | sed 's/ QMK//g' | sed 's/ GMK//g' | sed -E 's/ ANSI([[:space:]]|$)/\1/g' | sed -E 's/ ISO([[:space:]]|$)/\1/g' | sed -E 's/ +/ /g' | sed 's/^ *//;s/ *$//')
    
    # Check for ANSI and ISO variants
    has_ansi=0
    has_iso=0
    
    if echo "$filename" | grep -q ANSI; then
        has_ansi=1
    fi
    
    if echo "$filename" | grep -q ISO; then
        has_iso=1
    fi
    
    echo "${manufacturer}|${readable_name}|${has_ansi}|${has_iso}" >> "$KEYBOARD_DATA"
done

# Phase 2: Sort and organize data
sort "$KEYBOARD_DATA" | sort -t'|' -k1,1 -k2,2 > "${TEMP_DIR}/keyboards_sorted.txt"

# Phase 3: Generate markdown file
{
    cat <<'HEADER'
# Supported Keyboards

This document lists all QMK keyboards supported by SignalRGB plugins. The list is automatically generated and can be updated using the `scripts/update-keyboards.sh` script.

HEADER

    # Count total keyboards
    total_keyboards=$(wc -l < "$KEYBOARD_DATA")
    echo "**Total Keyboards Supported: ${total_keyboards}**"
    echo ""
    echo "## Table of Contents"
    
    # Generate table of contents
    awk -F'|' '{print $1}' "$KEYBOARD_DATA" | sort -u | while read -r mfg; do
        count=$(grep "^${mfg}|" "$KEYBOARD_DATA" 2>/dev/null | wc -l)
        mfg_anchor=$(echo "$mfg" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
        echo "- [${mfg}](#${mfg_anchor}) (${count})"
    done
    
    echo ""
    echo "---"
    echo ""
    
    # Generate content by manufacturer
    awk -F'|' '{print $1}' "$KEYBOARD_DATA" | sort -u | while read -r mfg; do
        
        echo "## ${mfg}"
        echo ""
        
        mfg_keyboards=$(grep "^${mfg}|" "$KEYBOARD_DATA" 2>/dev/null | sort -t'|' -k2)
        count=$(echo "$mfg_keyboards" | grep -c . || true)
        
        echo "**Total: ${count} keyboards**"
        echo ""
        
        # Output keyboards with format badges
        echo "$mfg_keyboards" | awk -F'|' '
        {
            name = $2
            ansi = $3
            iso = $4
            
            # Build format badges
            formats = ""
            if (ansi == 1 && iso == 1) {
                formats = " [ANSI] [ISO]"
            } else if (ansi == 1) {
                formats = " [ANSI]"
            } else if (iso == 1) {
                formats = " [ISO]"
            }
            
            printf "- %s%s\n", name, formats
        }
        '
        
        echo ""
        echo ""
    done
    
} > "$OUTPUT_FILE"

echo "✓ Generated ${OUTPUT_FILE}"
echo "✓ Total keyboards: $(wc -l < "$KEYBOARD_DATA")"
echo "✓ Manufacturers: $(awk -F'|' '{print $1}' "$KEYBOARD_DATA" | sort -u | wc -l)"
