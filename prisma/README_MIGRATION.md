# Blog Post Data Migration Script

This script handles the migration of the existing blog post data to the new schema with:
1. Multiple images per blog post (instead of a single image field)
2. Dedicated tables for categories and tags (instead of comma-separated strings)

## Prerequisites

- Node.js and npm/pnpm installed
- Access to the database with proper permissions
- Prisma client generated with `npx prisma generate`

## Usage

```bash
# Basic usage
node migrate-data.js

# Dry run (no changes to the database)
node migrate-data.js --dry-run

# Clean legacy fields after migration
node migrate-data.js --clean

# Set log level (minimal, normal, verbose)
node migrate-data.js --log-level=verbose

# Skip generating a report
node migrate-data.js --no-report

# Combine options
node migrate-data.js --dry-run --log-level=verbose
```

## Configuration

The script has the following configuration options:

- `dryRun`: When set to true, shows what changes would be made without actually modifying the database
- `generateReport`: Creates a detailed JSON report of the migration
- `reportPath`: Path where the report will be saved
- `cleanLegacyFields`: If true, clears the legacy fields after successful migration
- `logLevel`: Controls verbosity of output ('minimal', 'normal', 'verbose')

## Migration Steps

The script performs the following operations:

1. **Migrate Categories:**
   - Extracts all unique category names from comma-separated strings
   - Creates Category records
   - Links posts to categories through the PostCategory join table

2. **Migrate Tags:**
   - Extracts all unique tag names from comma-separated strings
   - Creates Tag records
   - Links posts to tags through the PostTag join table

3. **Migrate Images:**
   - For each post with an image URL, creates a PostImage record
   - Sets the image order to 0 (primary image)

4. **Fix Missing Relations:**
   - Finds posts that might have been missed in the initial migration
   - Creates any missing relationships

5. **Verification:**
   - Checks for incomplete migrations
   - Generates statistics

6. **Cleanup (Optional):**
   - Sets legacy fields to null if --clean flag is used
   - Otherwise, preserves backward compatibility

## Report

The migration report is saved as JSON and includes:
- Timing information
- Counts of migrated entities
- Any errors or warnings encountered
- Configuration used for the migration

## Backward Compatibility

By default, the legacy fields (`categories`, `tags`, and `image`) are preserved to maintain backward compatibility with any code that still relies on them. After verifying that all your code has been updated to use the new relations, you can clear these fields by running the script with the `--clean` flag.

## Troubleshooting

If you encounter any issues:

1. Run with `--dry-run --log-level=verbose` to see detailed diagnostic information
2. Check the migration report for errors and warnings
3. Fix specific records with issues identified in the report
4. Run again with `--dry-run` to verify fixes before committing changes
