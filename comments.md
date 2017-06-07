# CODE REVIEW 1

## README
	- What's in a good readme?

## Tasks
	- Writing good tickets 
	- Great front end user stories!
	- 15 - 60 mins of work
	- As specific as possible (GET ROUTE FOR PRODUCT not PRODUCT ROUTES)
	- Semantic commit messages:

	   - the type of commit (feature, test, fix, style, refactor, etc.)
	   - the subject of the committed code
	   - a present-tense description of what the commited code does

## Routes
	- No tests? How do we test for auth?
	- Route tests - creating user classes in before Hook
	- Tdd
	- How can we protect user updated by user class/ auth status?
	- Conventional Statuses = 200 for GET, 201 for POST/PUT, 204 for DELETE
	- Non-semantic routes (evidence of copypasting :-/ )

## Models
	- take a SEAT (Stop Everything And Test)
	- Order vs Order Items?
	- Sequelize.DECIMAL for price
	- Sequelize.ARRAY will be the death of civilization
	- hasMany vs belongsTo in models (hasMany adds relational ID, belongsTo gives instance Methods)
	- Take time to map out Associations
