# Update Scripts

This directory contains scripts to automatically generate and update the supported keyboards list.

## Update Keyboards Script

The `update-keyboards.sh` and `update-keyboards.ps1` scripts scan all keyboard manufacturer directories and regenerate the `SUPPORTED_KEYBOARDS.md` file with a complete list of supported keyboards.

### Usage

**On Windows (PowerShell):**
```powershell
pwsh scripts/update-keyboards.ps1
# or
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/update-keyboards.ps1
```

**On macOS/Linux (Bash):**
```bash
bash scripts/update-keyboards.sh
# or (if executable)
./scripts/update-keyboards.sh
```

### What It Does

1. Scans all subdirectories in the repository for `.js` keyboard definition files
2. Extracts keyboard names, variants (HE, Max, Pro, etc.), and format support (ANSI/ISO)
3. Organizes keyboards by manufacturer
4. Generates a human-readable markdown file: `SUPPORTED_KEYBOARDS.md`
5. Displays summary statistics

### Output Format

The generated `SUPPORTED_KEYBOARDS.md` file includes:
- Table of contents with manufacturer links
- Total keyboard count
- Per-manufacturer sections with counts
- Clear formatting with ANSI/ISO support badges: `[ANSI]` `[ISO]`
- Variant information (HE, Max, Pro, etc.) clearly distinguished in keyboard names

### Requirements

**PowerShell Script:**
- PowerShell 7+ (pwsh) or Windows PowerShell 5.1+

**Bash Script:**
- bash or sh
- Standard Unix tools: `find`, `awk`, `sed`, `sort`

### Notes

- The scripts do not modify any keyboard files themselves
- Only generates/overwrites the `SUPPORTED_KEYBOARDS.md` file
- No git operations are performed (no commits or pushes)
- Run manually as needed when keyboards are added/removed
