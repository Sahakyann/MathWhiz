select u.userID,u.username
into #temp_table_username
from Users u

update t
set t.username = 'Glorious User ' + t.userID
from #temp_table_username t
where t.username is null

update u
set u.username = u.display_name
from Users u

update u
set u.display_name = t.username
from Users u
join #temp_table_username t on u.userID = t.userID

drop table #temp_table_username

