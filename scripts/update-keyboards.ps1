#!/usr/bin/env pwsh
################################################################################
# SignalRGB QMK Plugins - Keyboard List Generator
#
# This script scans all keyboard manufacturer directories and generates a
# comprehensive markdown file listing all supported keyboards with their
# supported formats (ANSI/ISO).
#
# Usage:
#   pwsh scripts/update-keyboards.ps1
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/update-keyboards.ps1
#
# Output:
#   SUPPORTED_KEYBOARDS.md (in repository root)
#
# Requirements:
#   - PowerShell 7+ (pwsh) or Windows PowerShell 5.1+
#   - Read access to keyboard directories
#
################################################################################

$ErrorActionPreference = "Stop"

# Get the repository root directory
$repoRoot = Split-Path -Parent $PSScriptRoot
$outputFile = Join-Path $repoRoot "SUPPORTED_KEYBOARDS.md"

Write-Host "Scanning for keyboards in ${repoRoot}..."

# Phase 1: Scan all keyboard files and collect data
$keyboardData = @()

Get-ChildItem -LiteralPath $repoRoot -Filter "*.js" -Recurse -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName -notmatch '\.git' } | 
    ForEach-Object {
        $file = $_
        
        # Get manufacturer and folder structure
        $relativePath = $file.FullName.Substring($repoRoot.Length + 1)
        $pathParts = $relativePath -split '\\'
        $manufacturer = $pathParts[0]
        $folder = $pathParts[0..($pathParts.Length - 2)] -join '\'
        
        # Get filename without extension
        $filename = $file.BaseName
        
        # Check for ANSI and ISO variants before cleaning
        $hasANSI = $filename -match '_ANSI(?:_|Keyboard|QMK|$)'
        $hasISO = $filename -match '_ISO(?:_|Keyboard|QMK|$)'
        
        # Convert filename to readable format (replace underscores with spaces, remove QMK/GMK and format suffixes)
        $readableName = $filename -replace '_', ' '
        $readableName = $readableName -replace ' QMK ', ' '
        $readableName = $readableName -replace ' GMK ', ' '
        $readableName = $readableName -replace ' ANSI(?=\s|$)', ''
        $readableName = $readableName -replace ' ISO(?=\s|$)', ''
        $readableName = $readableName -replace '\s+', ' ' -replace '^\s+|\s+$', ''
        
        # If neither ANSI nor ISO found, mark as -1 (no badge)
        if (-not $hasANSI -and -not $hasISO) {
            $hasANSI = -1
            $hasISO = -1
        }
        
        $keyboardData += [PSCustomObject]@{
            Manufacturer = $manufacturer
            ReadableName = $readableName
            HasANSI = if ($hasANSI -eq $true) { 1 } elseif ($hasANSI -eq $false) { 0 } else { -1 }
            HasISO = if ($hasISO -eq $true) { 1 } elseif ($hasISO -eq $false) { 0 } else { -1 }
            Folder = $folder
            Filename = $filename
        }
    }

# Phase 2: Sort data
$keyboardData = $keyboardData | Sort-Object Manufacturer, ReadableName

# Phase 3: Generate markdown file
$markdown = @'
# Supported Keyboards

This document lists all QMK keyboards supported by SignalRGB plugins. The list is automatically generated and can be updated using the `scripts/update-keyboards.ps1` script.

'@

$markdown += "**Total Keyboards Supported: $($keyboardData.Count)**`n"
$markdown += "`n## Table of Contents`n"

# Generate table of contents
$manufacturers = $keyboardData | Group-Object Manufacturer | Sort-Object Name
foreach ($mfg in $manufacturers) {
    $mfgName = $mfg.Name
    $count = $mfg.Group.Count
    $anchor = $mfgName.ToLower() -replace '\s+', '-'
    $markdown += "- [$mfgName](#$anchor) ($count)`n"
}

$markdown += "`n---`n`n"

# Generate content by manufacturer
foreach ($mfg in $manufacturers) {
    $mfgName = $mfg.Name
    $mfgKeyboards = $mfg.Group
    
    $markdown += "## $mfgName`n`n"
    $markdown += "**Total: $($mfgKeyboards.Count) keyboards**`n`n"
    
    # Group by series/folder if applicable
    $prevFolder = ""
    foreach ($kb in $mfgKeyboards) {
        # Add spacing between different folders
        if ($prevFolder -ne $kb.Folder -and $prevFolder -ne "") {
            $markdown += "`n"
        }
        
        # Build format badges
        $formats = ""
        if ($kb.HasANSI -eq 1 -and $kb.HasISO -eq 1) {
            $formats = " [ANSI] [ISO]"
        } elseif ($kb.HasANSI -eq 1) {
            $formats = " [ANSI]"
        } elseif ($kb.HasISO -eq 1) {
            $formats = " [ISO]"
        }
        
        $markdown += "- $($kb.ReadableName)$formats`n"
        $prevFolder = $kb.Folder
    }
    
    $markdown += "`n"
}

# Write output file
Set-Content -LiteralPath $outputFile -Value $markdown -Encoding UTF8

Write-Host "[OK] Generated $outputFile"
Write-Host "[OK] Total keyboards: $($keyboardData.Count)"
Write-Host "[OK] Manufacturers: $($manufacturers.Count)"
