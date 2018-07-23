
module.exports = (todo, req, res) => {
    const id = req.params.id;
    todo.asNotDone(id)
        .then(one => {
            res.status(200)
            res.json(one)
            res.end()
        }).catch(({message}) => {
            response.status(500)
            response.json({error:message})
          })
}