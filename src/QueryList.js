const QueryList = () => {
    return [
        {
            title: "(path finding) Display the thread (replies) of tweets (the tweet, time, id, in reply to id, user name with their screen name) posted by user with screen_name “blcklcfr” in the order in which they were posted. [HINT: use tweet's id to discover the thread]",
            query: `
            SELECT tweetText,
                    T.created_at,
                    id,
                    in_reply_to_status_id,
                    U.user_id,
                    screen_name
            FROM Tweet T INNER JOIN
                User U ON T.user_id = U.user_id
            WHERE U.screen_name = 'blcklcfr' AND
                in_reply_to_status_id <> 'NA' AND
                (in_reply_to_status_id IN (SELECT id
                            FROM Tweet T2 INNER JOIN
                                User U2 ON T2.user_id = U2.user_id
                            WHERE U2.screen_name = 'blcklcfr') OR
                id IN (SELECT in_reply_to_status_id
                    FROM Tweet T3 INNER JOIN
                    User U3 ON T3.user_id = U3.user_id
                    WHERE U3.screen_name = 'blcklcfr'))
            ORDER BY T.created_at            
            `
        },
        {
            title: "From which country have the tweets been most actively posted (most number of tweets)?",
            query: `
            Select CountryCodes.name as country, count(Tweet.id) as num_tweet from 
            Tweet 
            inner join Places on Tweet.place_id = Places.id 
            inner join CountryCodes on CountryCodes.country_code = Places.country_code
            group by CountryCodes.name order by count(Tweet.id) DESC Limit 1;                      
            `
        },        
        {
            title: "Question : Which user has posted the most tweets?",
            query: `
            SELECT u.user_id, u.name, COUNT(t.id) AS tweet_count
            FROM User u
            JOIN Tweet t ON u.user_id = t.user_id
            GROUP BY u.user_id, u.name
            ORDER BY tweet_count DESC
            LIMIT 1;           
            `
        },
        {
            title: "(trending) How many tweets are associated with each hashtag? (For tweets with multiple hashtags, add it for all them)",
            query: `
            SELECT hashtag, COUNT(*)
            FROM hashtagsTweets
            GROUP BY hashtag
            ORDER BY COUNT(*) DESC            
            `
        },
        {
            title: "(nature of engagement) For each verified user, what is the percentage of different types of tweets (simple tweet, reply, retweet, quoted tweet) to their overall number of tweets?",
            query: `
            SELECT
                u.user_id,
                u.name,
                twt.percentage_simple,
                twt.percentage_reply,
                twt.percentage_retweet,
                twt.percentage_quoted
            FROM
                (
                    SELECT
                        t.user_id,
                        (COUNT(CASE WHEN t.tweet_type = 'simple' THEN 1 END) / COUNT(*) * 100) AS percentage_simple,
                        (COUNT(CASE WHEN t.tweet_type = 'reply' THEN 1 END) / COUNT(*) * 100) AS percentage_reply,
                        (COUNT(CASE WHEN t.tweet_type = 'retweet' THEN 1 END) / COUNT(*) * 100) AS percentage_retweet,
                        (COUNT(CASE WHEN t.tweet_type = 'quoted' THEN 1 END) / COUNT(*) * 100) AS percentage_quoted
                    FROM
                        Tweet t
                    WHERE
                        t.user_id IN (SELECT user_id FROM User WHERE verified = 1)
                    GROUP BY
                        t.user_id
                ) twt
            JOIN
                User u ON twt.user_id = u.user_id;
            `
        },
        {
            title: "(BONUS sixth question): Are there any three users A, B, C such that: User B replied to one of user A's tweets, and user C replied to that tweet of User B's that was a reply to User A, and User A replied to some other, unrelated, tweet of User C's? ",
            query: `
            Select Distinct u1.screen_name as UserA, u2.screen_name as UserB, u3.screen_name as UserC 
            from Tweet t1 
            inner join Tweet t2 on t1.in_reply_to_status_id = t2.id
            inner join Tweet t3 on t2.in_reply_to_status_id = t3.id
            inner join User u1 on t1.user_id = u1.user_id 
            inner join User u2 on t2.user_id = u2.user_id
            inner join User u3 on t3.user_id = u3.user_id
            inner join Tweet t4 on t4.user_id = u3.user_id
            inner join Tweet t5 on t5.user_id = u1.user_id AND t5.in_reply_to_status_id = t4.id
            where u1.screen_name < u2.screen_name and u2.screen_name < u3.screen_name;
          `
        }

    ];
}

export default QueryList;