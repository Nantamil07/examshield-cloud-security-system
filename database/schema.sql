create table users(
  id uuid primary key,
  name text,
  email text unique,
  role text,
  created_at timestamp default now()
);

create table question_papers(
  id uuid primary key,
  subject text,
  department text,
  semester text,
  exam_name text,
  encrypted_file_url text,
  hash text,
  status text default 'Pending',
  release_time timestamp,
  created_at timestamp default now()
);

create table audit_logs(
  id uuid primary key,
  user_id uuid,
  action text,
  description text,
  created_at timestamp default now()
);
