const handleProfile = (req, res, db) => {
	const {id} = req.params;
	let found = false;
	//return every user that has the same as the one from req.params
	db.select('*').from('users').where({
		id: id
	})  
	.then(user => {
		if(user.length){
		  res.json(user[0]);
		}else{
			res.status(400).json('Not found');
		}	
	})
	.catch(err => res.status(400).json('Error getting users'));
	
}

module.exports = {
    handleProfile: handleProfile
}