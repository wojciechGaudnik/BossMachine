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

minionsRouter.get('/', (req, res) => {
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


minionsRouter.get('/:minionId/work', (req, res) => {
    res.send(getAllFromDatabase('work').filter((work) => {
        return work.minionId === req.params.minionId;
    }));
});

minionsRouter.post('/:minionId/work', (req, res) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    res.status(201).send(addToDatabase('work', workToAdd));
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        res.send(updateInstanceInDatabase('work', req.body));
    }
});

minionsRouter.delete('/:minionId/work/:workId', ((req, res) => {
    const deleted = deleteFromDatabaseById('work', req.params.workId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
}));
