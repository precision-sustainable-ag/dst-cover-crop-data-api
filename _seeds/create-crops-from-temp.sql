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

insert into regions (label, created_at, updated_at) VALUES
('Northeast',now(),now());

insert into zones (label, region_id, created_at, updated_at) VALUES
('4',1,now(),now()),
('5',1,now(),now()),
('6',1,now(),now()),
('7',1,now(),now())
;

insert into crops_zones (crop_id, zone_id, created_at, updated_at)
select
	crops.id as crop_id,
	zones.id as zone_id,
	now() as created_at,
	now() as updated_at
from crops
join temp_crops_zones map on map.crop = crops.label
join zones on map.zone = zones.label
;
