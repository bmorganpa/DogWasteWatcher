ALTER TABLE wastes ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();