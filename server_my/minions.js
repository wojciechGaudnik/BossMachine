const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('./db')

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('');
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId',  (req, res) => {
    res.send(req.minion);
})

minionsRouter.post('/',  (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res) => {
    let updateMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinionInstance);
})

minionsRouter.delete('/:minionId', (req, res) => {
    const deleted = deleteFromDatabaseById('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})