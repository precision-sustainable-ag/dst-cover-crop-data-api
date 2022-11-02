


UPDATE images SET is_thumbnail = true WHERE src ilike '%Millet_pearl_flowering_Larson_2020%';

SELECT id, label from crops where id not in (
SELECT 
distinct crop_id
FROM images
WHERE is_thumbnail = true);



SELECT * from crops where id not in (
SELECT distinct crops.id FROM images 
JOIN crops on images.crop_id = crops.id
where images.is_thumbnail = true
)
;

UPDATE images SET crop_id = 26 where crop_id is null;

select * from images where src ilike '%Millet_pearl_flowering_Larson_2020%';

select * from images where crop_id is null;

select * from crops where label = 'Oats, Winter';

select * from crops where label ilike '%millet%';

select * from images
join crops on crops.id = images.crop_id
where crops.label = 'Oats, Winter';

insert into images (src, is_thumbnail, region_id, created_at, updated_at, growth_stage, "owner", year_taken, crop_id)
select
	images.src,
	images.is_thumbnail,
	images.region_id,
	images.created_at,
	images.updated_at,
	images.growth_stage,
	images."owner",
	images.year_taken,
	( select crops.id from crops where label = 'Cereal Rye, Spring' ) as crop_id
from images where crop_id = (select id from crops where label = 'Cereal Rye, Winter');


