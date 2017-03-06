var async = require('async');
var ext_db_params = require('../db/ext_db_params.js');
var queryDb = require('../db/queryDb.js')(ext_db_params.turns);

var compare_entries = function(entry_1, entry_2, cb) {
};

var find_need_comp = function(cb) {
/*
Get's a list of all entry pairs that need to be compared with each other
*/
WITH compare AS (
SELECT
	source,
	COUNT(source),
	array_agg(entries) as comp_ent
FROM 
	entries
GROUP BY 
	source
HAVING
	COUNT(source) > 1

INSERT INTO entries_comp(entry_1, entry_2)
SELECT
	comp_ent[1],
	comp_ent[2]
FROM
	compare
WHERE
	array_length(comp_ent, 1) = 2

UNION
SELECT
	comp_ent[1],
	comp_ent[3]
FROM 
	compare
WHERE
	array_length(comp_ent, 1) = 3
	
UNION
SELECT
	comp_ent[2],
	comp_ent[3]
FROM 
	compare
WHERE
	array_length(comp_ent, 1) = 3

}

var update_batch_assigns = function(cb) {
/*
Update the qa_score field in batch_assigns so that: 
    1.) If there is agreement btw two entries, the qa_score is assigned to both and qa_resolved is marked true
    2.) The qa_score for the disagreeing entry is the comp_score between the chosen entry.
    3.) Update qa_resolved for all entries at the score.
*/
}

var insert_comp = function(comp, cb) {
/*
comp is an object w/ the fields we need.

entry template

INSERT INTO (
    blah,
    blah
) VALUES (
    $1,
    $2
)
*/
}

var get_sources_that_need_tiebreaker = function(cb) {
/*
Get sources that need a tie breaker 
*/
}