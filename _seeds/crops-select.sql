select
	sci.* as scientific_name,
	usda.symbol as usda_symbol,
	now() as created_at,
	now() as updated_at
from

	(select 
		distinct crop,
		value as scientific_name
	from crop_data
	where attribute ilike 'scientific%name%') sci

join 

	(select 
		distinct crop,
		value as symbol
	from crop_data
	where attribute ilike '%usda%') usda
	
	on sci.crop = usda.crop
;