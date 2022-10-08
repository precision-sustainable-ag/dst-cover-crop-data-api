
select
	sci.crop as crop,
	usda.symbol as usda_symbol,
	crop_sci.scientific_name as scientific_name,
	sci.scientific_name as family_scientific_name,
	com.common_name as family_common_name,
	groups.label as group
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
	
join 

	(select 
		distinct crop,
		value as label
	from crop_data
	where attribute ilike '%group%') groups
	
	on groups.crop = sci.crop

join
	(select 
		distinct crop,
		value as scientific_name
	from crop_data
	where attribute ilike 'scientific%name%') crop_sci
	
	on sci.crop = crop_sci.crop

join 

	(select 
		distinct crop,
		value as symbol
	from crop_data
	where attribute ilike '%usda%') usda
	
	on sci.crop = usda.crop
;
