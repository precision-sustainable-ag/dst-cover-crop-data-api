
select 
	distinct value as label,
	now() as created_at,
	now() as updated_at
from crop_data
where attribute ilike '%group%';
