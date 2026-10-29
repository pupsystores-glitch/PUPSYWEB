CREATE TABLE IF NOT EXISTS votes (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  voter_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (product_id, voter_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_product ON votes(product_id);

CREATE TABLE IF NOT EXISTS vote_contacts (
  vote_id TEXT PRIMARY KEY REFERENCES votes(id) ON DELETE CASCADE,
  contact TEXT NOT NULL,
  created_at TEXT NOT NULL
);
