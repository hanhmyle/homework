--consumer_complaints
drop table consumer_complaints
CREATE TABLE consumer_complaints (
  complaint_id INT,
  date_received date,
  product VARCHAR null,
  sub_product VARCHAR null,
  issue varchar null,
  company varchar null,
  state varchar null,
  zipcode varchar null,
  submitted_via varchar null,
  date_sent_to_company date,
  company_response_to_consumer varchar null,
  timely_response boolean,
  consumer_disputed boolean
);
select * from consumer_complaints

--State
drop table states
CREATE TABLE states (  
  State varchar,
  Abbreviation varchar
);
select * from states

--Vet by Age group
drop table vets_by_age_group;
CREATE TABLE vets_by_age_group (  
  "State" varchar,
  "Ages < 20" varchar,
  "Ages 20-24" varchar,
  "Ages 25-29" varchar,
  "Ages 30-34" varchar,
  "Ages 35-39" varchar,
  "Ages 40-44" varchar,
  "Ages 45-49" varchar,  
  "Ages 50-54" varchar,
  "Ages 55-59" varchar,
  "Ages 60-64" varchar,
  "Ages 65-69" varchar,
  "Ages 70-74" varchar,
  "Ages 75-79" varchar,
  "Ages 80-84" varchar,
  "Ages 85+" varchar
);
select * from vets_by_age_group

--Vet by race
drop table vets_by_race;
select * from vets_by_race;
CREATE TABLE vets_by_race (  
  state varchar,
  white varchar,
  blackOrAfricanAmerican varchar,
  americanIndian varchar,
  asian varchar,
  others varchar,
  hispanic varchar
);