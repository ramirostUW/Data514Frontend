const QueryList = () => {
    return [
        {
            title: "Country with most tweets",
            query: `
            Select country_code, count(Tweet.id) as num_tweet
            from Tweet inner join Places on Tweet.place_id = Places.id
            group by Places.country_code
            order by count(Tweet.id) DESC
            Limit 1;            
            `
        },
        {
            title: "Question about reply group",
            query: `
            Select Distinct u1.screen_name as UserA, u2.screen_name as UserB, u3.screen_name as UserC 
            from Tweet t1 
            inner join Tweet t2 on t1.in_reply_to_status_id = t2.id
            inner join Tweet t3 on t2.in_reply_to_status_id = t3.id
            inner join User u1 on t1.user_id = u1.user_id 
            inner join User u2 on t2.user_id = u2.user_id
            inner join User u3 on t3.user_id = u3.user_id
            where u1.screen_name < u2.screen_name and u2.screen_name < u3.screen_name;
          `
        }
        
    ];
}

export default QueryList;