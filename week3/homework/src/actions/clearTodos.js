
module.exports = (todo, req, res) => {
    todo.delete_all()
        .then(() => {
            console.log('Done');
            res.status(204)
            res.end()
        }).catch(({message}) => {
            response.status(500)
            response.json({error:message})
          })
}