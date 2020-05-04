const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabaseById,
} = require('./db')

ideasRouter.param('ideasId', (req, res, next, id) => {
    const minion = getFromDatabaseById('ideas', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('');
    }
});

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideasId',  (req, res) => {
    res.send(req.minion);
})

ideasRouter.post('/',  (req, res) => {
    const newMinion = addToDatabase('ideas', req.body);
    res.status(201).send(newMinion);
});

ideasRouter.put('/:ideasId', (req, res) => {
    let updateMinionInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updateMinionInstance);
})

ideasRouter.delete('/:ideasId', (req, res) => {
    const deleted = deleteFromDatabaseById('ideas', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})