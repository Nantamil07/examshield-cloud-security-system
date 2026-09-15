
alter table users enable row level security;
create policy "Users can read own profile" on users for select using (auth.uid()=id);
