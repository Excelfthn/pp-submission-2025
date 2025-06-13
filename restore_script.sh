#!/bin/bash

# PostgreSQL Database Restore Script
# This script restores a PostgreSQL database from a backup file

# Configuration - Update these variables according to your database setup
DB_NAME="your_database_name"
DB_USER="your_username"
DB_HOST="localhost"
DB_PORT="5432"

# Check if backup file is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <backup_file.sql>"
    echo "Example: $0 ./backups/pitchpro_backup_20241201_120000.sql"
    exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file '$BACKUP_FILE' not found!"
    exit 1
fi

# If the file is compressed, decompress it first
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "Decompressing backup file..."
    gunzip "$BACKUP_FILE"
    BACKUP_FILE="${BACKUP_FILE%.gz}"
fi

echo "Starting PostgreSQL database restore..."
echo "Database: $DB_NAME"
echo "Backup file: $BACKUP_FILE"
echo "⚠️  WARNING: This will overwrite the existing database!"

# Ask for confirmation
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 1
fi

# Restore the database using psql
echo "Restoring database..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Database restore completed successfully!"
else
    echo "❌ Database restore failed!"
    exit 1
fi

echo "🎉 Restore process completed!"