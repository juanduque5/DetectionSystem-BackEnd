//updates the increment where the id same as req.body and return it to the front end
const handleImage = (req, res, db) => {
	const {id} = req.body;  
	let found = false;
	

   db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'));
}


module.exports = {
    handleImage: handleImage
}