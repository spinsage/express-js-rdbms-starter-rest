const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { db } = require('../db')

const router = express.Router()

router.get("/contacts/:id", async (request, response) => {
    const contact = await db.models.contacts.findOne({
        where: {
            uid: request.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
        }
    })

    console.log(contact)

    if (!contact) {
        return response.status(400).send()
    } else {
        return response.send(contact)
    }
})

router.post("/contacts", async (request, response) => {
    request.body.uid = uuidv4().replace(/-/g, '')

    const createdContact = await db.models.contacts.create(request.body)
    const responsData = createdContact.dataValues

    delete responsData.id
    delete responsData.createdAt
    delete responsData.updatedAt

    return response.send(responsData)
})

router.put("/contacts/:id", async (request, response) => {
    const updateCount = await db.models.contacts.update(request.body, {
        where: {
            uid: request.params.id
        }
    })

    if (updateCount[0] !== 0) {
        return response.status(200).send()
    } else {
        return response.status(400).send()
    }
})

router.delete("/contacts/:id", async (request, response) => {
    const deletedCount = await db.models.contacts.destroy({
        where: {
            uid: request.params.id
        }
    })

    if (deletedCount !== 0) {
        return response.status(200).send()
    } else {
        return response.status(400).send()
    }
})

module.exports = router
