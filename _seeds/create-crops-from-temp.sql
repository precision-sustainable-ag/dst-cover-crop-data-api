insert into crops (label, usda_symbol, scientific_name, family_id, group_id, created_at, updated_at)
select 
	crps.crop,
	crps.usda_symbol,
	crps.scientific_name,
	families.id as family_id,
	groups.id as group_id,
	now() as created_at,
	now() as updated
from crops_groups_and_fams crps
join families 
	on families.scientific_name = crps.family_scientific_name 
	and families.common_name = crps.family_common_name
join groups
	on groups."label" = crps.group
;