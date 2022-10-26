
select
	distinct sci.scientific_name as scientific_name,
	com.common_name as common_name,
	now() as created_at,
	now() as updated_at
from

	(select 
		distinct crop,
		value as scientific_name
	from crop_data
	where attribute ilike '%family%scientific%name%') sci

join 

	(select 
		distinct crop,
		value as common_name
	from crop_data
	where attribute ilike '%family%common%name%') com
	
	on sci.crop = com.crop
;


-- proof scientific name and common name is one to one pairing
select
	sci.scientific_name,
	count(distinct com.common_name) as num_of_coms
from
	(select 
		distinct crop,
		value as scientific_name
	from crop_data
	where attribute ilike '%family%scientific%name%') sci

join 

	(select 
		distinct crop,
		value as common_name
	from crop_data
	where attribute ilike '%family%common%name%') com
	
	on sci.crop = com.crop
group by sci.scientific_name
;
