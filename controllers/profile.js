const handleProfileGet = (req, res, db) => {
    const {
        id
    } = req.params;
    db("users")
        .select("*")
        .where({
            id: id,
        })
        .then((user) => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json("no such user exist");
            }
        });
}

module.exports = {
    handleProfileGet: handleProfileGet
}