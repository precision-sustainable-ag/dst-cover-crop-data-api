to create & seed the db:

1) run the npm command `npm run db-sync` or run `npm run db-fresh` if you want to drop any conflicting existing tables and recreate them.
2) import groups.csv to groups table
3) import families.csv to families table
4) import crops_groups_and_fams.csv and have it create a table
5) import temp_crops_zones.csv and have it create a table
6) run the create-crops-from-temp.sql ( copy & paste works just fine ;P )
7) run the command `source venv/