CREATE INDEX IF NOT EXISTS "search_index" ON "items" USING gin ((
                setweight(to_tsvector('english', "name"), 'A') ||
                setweight(to_tsvector('english', coalesce("description", '')), 'B'
            ));