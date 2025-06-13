# PostgreSQL Database Backup Guide

This directory contains several backup-related files for your PostgreSQL database. Here's what each file does and how to use them:

## Files Created

### 1. `database_backup.sql`

A complete SQL backup file containing:

- Database schema (table structures, sequences, constraints)
- Sample data from all tables
- Proper foreign key relationships
- Sequence reset commands

### 2. `backup_script.sh`

An automated backup script that uses `pg_dump` to create complete database backups.

### 3. `restore_script.sh`

A restoration script to restore your database from backup files.

### 4. `BACKUP_README.md`

This documentation file.

## Database Structure

Your database contains the following tables:

- **users** - User accounts and profiles
- **badge** - Achievement badges
- **stories** - Presentation scenarios and challenges
- **user_progress** - User progress through stories
- **pre-test** - Pre-assessment data
- **post-test** - Post-assessment data
- **detail_progress** - Detailed progress information
- **user_detail** - Additional user details

## How to Use

### Option 1: Use the Manual SQL Backup

1. **To restore from the manual backup:**
   ```bash
   psql -U your_username -d your_database_name -f database_backup.sql
   ```

### Option 2: Use the Automated Scripts

1. **Configure the scripts:**
   Edit both `backup_script.sh` and `restore_script.sh` to update these variables:

   ```bash
   DB_NAME="your_actual_database_name"
   DB_USER="your_actual_username"
   DB_HOST="localhost"  # or your database host
   DB_PORT="5432"       # or your database port
   ```

2. **Create a backup:**

   ```bash
   ./backup_script.sh
   ```

   This will:

   - Create a timestamped backup file
   - Compress it with gzip
   - Store it in the `./backups/` directory
   - Clean up old backups (older than 30 days)

3. **Restore from a backup:**
   ```bash
   ./restore_script.sh ./backups/pitchpro_backup_YYYYMMDD_HHMMSS.sql
   ```

## Database Connection Setup

### Using .pgpass file (Recommended)

To avoid password prompts, create a `.pgpass` file in your home directory:

```bash
# Create .pgpass file
echo "localhost:5432:your_database_name:your_username:your_password" >> ~/.pgpass
chmod 600 ~/.pgpass
```

### Using Environment Variables

Alternatively, set these environment variables:

```bash
export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=your_database_name
export PGUSER=your_username
export PGPASSWORD=your_password
```

## Backup Best Practices

1. **Regular Backups**: Run backups daily or before major changes
2. **Test Restores**: Periodically test your backup files by restoring to a test database
3. **Multiple Locations**: Store backups in multiple locations (local, cloud, etc.)
4. **Monitor Size**: Keep an eye on backup file sizes to detect issues
5. **Retention Policy**: The script keeps 30 days of backups by default

## Troubleshooting

### Common Issues:

1. **Permission Denied**

   ```bash
   chmod +x backup_script.sh restore_script.sh
   ```

2. **pg_dump not found**

   - Install PostgreSQL client tools
   - Add PostgreSQL bin directory to your PATH

3. **Connection refused**

   - Check if PostgreSQL is running
   - Verify host, port, and credentials
   - Check firewall settings

4. **Authentication failed**
   - Verify username and password
   - Check pg_hba.conf configuration
   - Set up .pgpass file

## Security Notes

- Never commit backup files containing real data to version control
- Secure your backup files with appropriate permissions
- Consider encrypting sensitive backups
- Regularly rotate and test your backup strategy

## Additional Commands

### Create a schema-only backup:

```bash
pg_dump -U username -d database_name --schema-only > schema_backup.sql
```

### Create a data-only backup:

```bash
pg_dump -U username -d database_name --data-only > data_backup.sql
```

### Backup specific tables:

```bash
pg_dump -U username -d database_name -t users -t badge > partial_backup.sql
```

---

**Created**: $(date)
**Database**: PitchPro PostgreSQL Database
**Tables**: 8 tables with user data, progress tracking, and assessment information
