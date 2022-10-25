
CREATE OR REPLACE FUNCTION notify_data_edit() RETURNS TRIGGER AS $notify_data_edit$
    DECLARE
    	model TEXT;
    BEGIN        
    	--
        -- set channel to first argument
        -- package operation / old / new data into json object
        -- and use that json object as the payload in a notification event
        --
        model = TG_ARGV[0]::TEXT;
        
        PERFORM (
        	with payload(operation,old,"new") as (
        		SELECT 
                    model as model,
        			TG_OP as operation,
        			row_to_json(OLD)::TEXT as old,
        			row_to_json(NEW)::TEXT as "new"
        	)
        	SELECT pg_notify('data_edit',row_to_json(payload)::TEXT) FROM payload
        );
        
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$notify_data_edit$ LANGUAGE plpgsql;
