-- Add new columns for format tag and category tags
ALTER TABLE activities 
ADD COLUMN IF NOT EXISTS format_tag TEXT,
ADD COLUMN IF NOT EXISTS category_tags TEXT[];

-- Set default values for existing records
UPDATE activities 
SET format_tag = CASE 
  WHEN category = 'case-study' THEN 'case-study'
  WHEN category = 'technical' THEN 'tutorial'
  WHEN category = 'insight' THEN 'tips-tricks'
  ELSE 'tutorial'
END
WHERE format_tag IS NULL;

UPDATE activities
SET category_tags = tags
WHERE category_tags IS NULL AND tags IS NOT NULL;