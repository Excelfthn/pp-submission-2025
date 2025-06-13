#!/bin/bash

# PostgreSQL Database Backup Script
# This script creates a complete backup of your PostgreSQL database

# Configuration - Update these variables according to your database setup
DB_NAME="your_database_name"
DB_USER="your_username"
DB_HOST="localhost"
DB_PORT="5432"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/pitchpro_backup_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting PostgreSQL database backup..."
echo "Database: $DB_NAME"
echo "Backup file: $BACKUP_FILE"

# Create the backup using pg_dump
# This will prompt for password unless you have .pgpass file configured
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --verbose \
  --clean \
  --create \
  --if-exists \
  --format=plain \
  --file="$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully!"
    echo "Backup saved to: $BACKUP_FILE"
    echo "File size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Optional: Compress the backup
echo "Compressing backup..."
gzip "$BACKUP_FILE"
echo "✅ Compressed backup saved to: ${BACKUP_FILE}.gz"

# Optional: Remove backups older than 30 days
echo "Cleaning up old backups (older than 30 days)..."
find "$BACKUP_DIR" -name "pitchpro_backup_*.sql.gz" -mtime +30 -delete

echo "🎉 Backup process completed!"