const express = require('express')
const routers = express.Router()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./../../swagger.json')
routers.use('/api-docs', swaggerUi.serve)
routers.get('/api-docs', swaggerUi.setup(swaggerDocument))

const userMiddleware    = require('./user.middlewares')
const controllersUser   = require('./user.controllers')
const controllersTrilhas = require('../trilhas/trilhas.controllers')
const trilhasMiddleware    = require('../trilhas/trilhas.middlewares')



//           ####### Permissões para todos os Usuário #######

//Rota responsável por exibir todas as trilhas para todos os usuários
routers.get('/allTrilhas', controllersTrilhas.showAll)

//Rota responsável por exibir uma trílha específica para os usuários 
routers.get('/byTrilha/:id',
        trilhasMiddleware.checkId, 
        controllersTrilhas.showbyId
)

//           ####### Permissão para Usuário normal  #######

//Rota responsável por permitir o usuário comentar e avaliar uma trilha
routers.post('/commentsRate/:id', 
            trilhasMiddleware.checkId, 
            controllersTrilhas.avaliarComentar
)

//----------------------------------------------------------------------------


//           ####### Permisões para adm #######

//                      ------ Nos usuários --------

//Rota responsável por exibir todos os usuáros
routers.get('/allUser/:idAdm', 
            userMiddleware.checkAdmId,
            userMiddleware.checkAdm, 
            controllersUser.showAll
)

//Rota responsável por exibir  os usuários pelo id
routers.get('/byUser/:idAdm/:id', 
            userMiddleware.checkAdmId, 
            userMiddleware.checkAdm,
            userMiddleware.checkId, 
            controllersUser.showbyId
)

//Rota responsavel por criar um usuário
routers.post('/createUser/:idAdm', 
            userMiddleware.checkAdmId,
            userMiddleware.checkAdm, 
            controllersUser.post_Put('post')
)


//Rota responsável por atualizar um usuário
routers.put('/updateUser/:idAdm/:id',
            userMiddleware.checkAdmId,
            userMiddleware.checkAdm,
            userMiddleware.checkId, 
            controllersUser.post_Put('put')
)

//Rota responsável por deletar uma usuário
routers.delete('/deleteUser/:idAdm/:id',
        userMiddleware.checkAdmId, 
        userMiddleware.checkAdm, 
        userMiddleware.checkId,
        controllersUser.delete
)


//                       ------ Nas trilhas  ------


//Rota responsável por criar uma trilha
routers.post('/createTrilha/:idAdm/',
        userMiddleware.checkAdmId, 
        userMiddleware.checkAdm, 
        controllersTrilhas.post_Put('post')
)

//Rota responsável por atualizar uma trilha
routers.put('/updateTrilha/:idAdm/:id',
        userMiddleware.checkAdmId,
        userMiddleware.checkAdm, 
        trilhasMiddleware.checkId, 
        controllersTrilhas.post_Put('put')
)

//Rota responsável por deletar uma trilha
routers.delete('/deleteTrilha/:idAdm/:id', 
        userMiddleware.checkAdmId, 
        userMiddleware.checkAdm, 
        trilhasMiddleware.checkId, 
        controllersTrilhas.delete
)


module.exports = routers
