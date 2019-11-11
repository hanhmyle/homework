select * from consumer_complaints
select * from states
select * from vets_by_age_group
select * from vets_by_race;

select * from consumer_complaints c
inner join states s on c.state = s.abbreviation
left join vets_by_age_group a on s.state = a."State"
left join vets_by_race r on s.state = r.state