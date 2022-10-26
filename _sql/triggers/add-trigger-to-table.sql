CREATE TRIGGER notify_data_edit
AFTER INSERT OR UPDATE OR DELETE ON <table_name>
    FOR EACH ROW EXECUTE FUNCTION notify_data_edit('<model-name>');