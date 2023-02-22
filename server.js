let express = require('express');

let app = express();
let port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const { body, validationResult } = require('express-validator');

app.use(express.json())

const options = {
    swaggerDefinition: {
        info: {
            title: 'swagger demo',
            version: '1.0.0',
            description: 'Swagger demo',
        },
        host: '137.184.133.59:3000',
        basepath: '/'
    },
    apis:['./server.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
        host : 'localhost',
        user : 'root',
        password: 'root',
        database: 'sample',
        port: 3306,
        connectionLimit:5
});


/**
 * @swagger
 * /customers:
 *    get:
 *      description: return all the customers
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'Customer object fetched'
 */
app.get('/customers', (req,res)=> {
        pool.query('SELECT * FROM customer')
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});


/**
 * @swagger
 * /customers/{cust_code}:
 *    get:
 *      description: return particular customer information
 *      produces:
 *          - application/json
  *      parameters:
 *          - name: cust_code
 *            in: path
 *            type: string
 *            example: C00018
 *            required: true
 *      responses:
 *          200:
 *              description: Customer object containing particular customer information fetched
 */
app.get('/customers/:cust_code', (req,res)=> {
        pool.query(`SELECT * FROM customer where CUST_CODE='${req.params.cust_code}'`)
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /foods:
 *    get:
 *      description: return all the foods
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'Foods object fetched'
 */
app.get('/foods', (req,res)=> {
        pool.query('SELECT * FROM foods')
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /foods/{item_id}:
 *    get:
 *      description: Return particular food item information
 *      produces:
 *          - application/json
  *      parameters:
 *          - name: item_id
 *            in: path
 *            type: string
 *            example: 9
 *            required: true
 *      responses:
 *          200:
 *              description: Food object containing particular food item information fetched
 */

app.get('/foods/:item_id',(req,res) => {
    pool.query(`SELECT * FROM foods WHERE ITEM_ID = '${req.params.item_id}'`)
    .then(rows => {
            res.statusCode = 200;
            res.setHeader('Content-Type','Application/json');
            res.json(rows);
            })
    .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /agents:
 *    get:
 *      description: return all the agents
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'Agent object fetched'
 */
app.get('/agents', (req,res)=> {
        pool.query('SELECT * FROM agents')
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /agents/{agent_code}:
 *    get:
 *      description: return particular agent information
 *      produces:
 *          - application/json
  *      parameters:
 *          - name: agent_code
 *            in: path
 *            type: string
 *            example: A009
 *            required: true
 *      responses:
 *          200:
 *              description: Agent object containing particular agent information fetched
 */
app.get('/agents/:agent_code', (req,res)=> {
        pool.query(`SELECT * FROM agents where AGENT_CODE='${req.params.agent_code}'`)
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /company:
 *    get:
 *      description: return all the companies
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'Company object fetched'
 */
app.get('/company', (req,res)=> {
        pool.query('SELECT * FROM company')
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /company/{company_id}:
 *    get:
 *      description: return particular company information
 *      produces:
 *          - application/json
  *      parameters:
 *          - name: company_id
 *            in: path
 *            type: string
 *            example: 18
 *            required: true
 *      responses:
 *          200:
 *              description: Company object containing particular company information fetched
 */
app.get('/company/:company_id', (req,res)=> {
        pool.query(`SELECT * FROM company where COMPANY_ID='${req.params.company_id}'`)
        .then(rows => {
                res.statusCode = 200;
                res.setHeader('Content-Type','Application/json');
                res.json(rows);
                })
        .catch(err => console.error('Query error', err.stack));
});

/**
 * @swagger
 * /foods/{item_id}:
 *    delete:
 *      description: delete the particular item
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: item_id
 *            in: path
 *            required: true
 *            type: integer
 *            format: int64
 *            example: 5
 *      responses:
 *          200:
 *              description: foods object succesfully deleted
 *          400:
 *              description: Incorrect parameter entered
 *          500:
 *              description: Server Error
 */

 app.delete('/foods/:item_id',(req,res)=> {

        pool.query(`DELETE FROM foods WHERE ITEM_ID = '${req.params.item_id}'`)
        .then(rows => {
                if (rows.affectedRows == 0) {
                        res.statusCode = 400;
                        res.setHeader('Content-Type','Application/json');
                        res.json({err:'Invalid ITEM_ID'})
                        return
                }
                else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type','Application/json');
                        res.json({200: 'food item succesfully deleted'})
                        return
                }
        })
        .catch(err => console.error('Query error', err.stack));
    });


/**
 * @swagger
 * /foods:
 *    post:
 *      description: Add a new food item with the "name", "unit", "id" and "companyid".
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Foods
 *            in: body
 *            required: true
 *            schema:
 *              properties:
 *                  ITEM_ID:
 *                       type: string
 *                       example: 111111
 *                  ITEM_NAME:
 *                        type: string
 *                        example: Snacks
 *                  ITEM_UNIT:
 *                        type: string
 *                        example: Pcs
 *                  COMPANY_ID:
 *                        type: string
 *                        example: 18
 *      responses:
 *          200:
 *              description: Food item added successfully
 *          400:
 *              description: Incorrect parameters
 *          500:
 *              description: Server Error
 */
app.post('/foods', [body('ITEM_ID','ITEM ID is required').not().isEmpty().trim(),
body('ITEM_ID').isNumeric().withMessage('ITEM_ID should be numeric').isLength({max:6}).withMessage("ITEM _ID cannot exceed 6 charecters"),
body('ITEM_NAME').isAlpha('en-US',{ignore:' '}).withMessage('Incorrect format for ITEM_NAME').isLength({max:25}).withMessage("ITEM_NAME cannot exceed 25 charecters"),
body('ITEM_UNIT').isAlpha('en-US',{ignore:' '}).withMessage('Incorrect format for ITEM_UNIT').isLength({max:5}).withMessage("ITEM_UNIT cannot exceed 5 charecters"),
body('COMPANY_ID').isNumeric().withMessage('COMPANY_ID should be numeric').isLength({max:6}).withMessage("COMPANY _ID cannot exceed 6 charecters"),], (req,res) => {

       const err = validationResult(req)
       if (!err.isEmpty()) {
               res.statusCode = 400
               res.json({err:err.array()})
               return;
       }

       const {ITEM_ID,ITEM_NAME,ITEM_UNIT,COMPANY_ID}=req.body

       pool.query(`INSERT INTO foods VALUES ('${ITEM_ID}', '${ITEM_NAME}', '${ITEM_UNIT}','${COMPANY_ID}')`)
       .then(rows => {
               res.statusCode = 200;
               res.set('Content-Type','Application/json');
               res.json("Added Successfully");
               })
       .catch(err => console.error('Query error', err.stack));
   });



/**
 * @swagger
 * /foods:
 *    put:
 *      description: insert if "id" is not present otherwise update the existing row
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: Foods
 *            in: body
 *            required: true
 *            schema:
 *              properties:
 *                  ITEM_ID:
 *                       type: string
 *                       example: 111111
 *                  ITEM_NAME:
 *                        type: string
 *                        example: Snacks
 *                  ITEM_UNIT:
 *                        type: string
 *                        example: Pcs
 *                  COMPANY_ID:
 *                        type: string
 *                        example: 18
 *      responses:
 *          200:
 *              description: Updated/inserted the food item succesfully
 *          400:
 *              description: Incorrect parameters
 *          500:
 *              description: Server Error
 */

app.put('/foods', [body('ITEM_ID','ITEM_ID is required').not().isEmpty().trim(),
body('ITEM_ID').isNumeric().withMessage('ITEM_ID should be numeric').isLength({max:6}).withMessage("ITEM _ID cannot exceed 6 charecters"),
body('ITEM_NAME').isAlpha('en-US',{ignore:' '}).withMessage('Incorrect format for ITEM_NAME').isLength({max:25}).withMessage("ITEM_NAME cannot exceed 25 charecters"),
body('ITEM_UNIT').isAlpha('en-US',{ignore:' '}).withMessage('Incorrect format for ITEM_UNIT').isLength({max:5}).withMessage("ITEM_UNIT cannot exceed 5 charecters"),
body('COMPANY_ID').isNumeric().withMessage('COMPANY_ID should be numeric').isLength({max:6}).withMessage("COMPANY _ID cannot exceed 6 charecters")], (req,res)=> {

       const err = validationResult(req)
       if (!err.isEmpty()) {
               res.statusCode = 400
               res.json({err:err.array()})
               return;
       }

       const {ITEM_ID,ITEM_NAME,ITEM_UNIT,COMPANY_ID}=req.body

       pool.query(`SELECT * FROM foods WHERE ITEM_ID = '${ITEM_ID}'`)
       .then(rows => {
               if (rows.length == 0) {
                       pool.query(`INSERT INTO foods VALUES ('${ITEM_ID}', '${ITEM_NAME}', '${ITEM_UNIT}', '${COMPANY_ID}')`)
                       .then(row => {
                               res.statusCode = 200;
                               res.set('Content-Type','Application/json');
                               res.json("Inserted Successfully")
                       })
                       .catch(err => console.error('Query error', err.stack));
               }
               pool.query(`UPDATE foods SET ITEM_NAME = '${ITEM_NAME}', ITEM_UNIT = '${ITEM_UNIT}', COMPANY_ID = '${COMPANY_ID}' WHERE ITEM_ID = '${ITEM_ID}'`)
               .then(ro => {
                       res.statusCode = 200;
                       res.set('Content-Type','Application/json');
                       res.json("Updated Successfully")
                       return
               })
               .catch(err => console.error('Query error', err.stack));
       })
       .catch(err => console.error('Query error', err.stack));
   });

/**
 * @swagger
 * /foods:
 *    patch:
 *      description: Update the item
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: "body"
 *            name: Foods
 *            required: true
 *            schema:
 *              properties:
 *                  ITEM_ID:
 *                       type: string
 *                       example: 111111
 *                  ITEM_NAME:
 *                        type: string
 *                        example: Snacks
 *                  ITEM_UNIT:
 *                        type: string
 *                        example: Pcs
 *                  COMPANY_ID:
 *                        type: string
 *                        example: 18
 *      responses:
 *          200:
 *              description: Updated/inserted the food item succesfully
 *          400:
 *              description: Incorrect parameters
 *          500:
 *              description: Server Error
 */
app.patch('/foods', [body('ITEM_ID','ITEM_ID is required').not().isEmpty().trim(),
body('ITEM_ID').isNumeric().withMessage('Incorrect ITEM_ID').isLength({max:6}).withMessage("ITEM_ID can have max 6 chars")], function(req,res) {

       const err = validationResult(req)
       if (!err.isEmpty()) {
               res.statusCode = 400
               res.json({err:err.array()})
               return;
       }

       const {ITEM_ID,ITEM_NAME,ITEM_UNIT,COMPANY_ID} = req.body
       var data_point= ''
       if (ITEM_NAME != undefined) {
        data_point += "ITEM_NAME = '" + ITEM_NAME + "'"
       }
       if (ITEM_UNIT != undefined) {
               if (data_point != '')
                 data_point += ", ITEM_UNIT = '" + ITEM_UNIT + "'"
               else
                 data_point += "ITEM_UNIT = '" + ITEM_UNIT + "'"

       }
       if (COMPANY_ID != undefined) {
               if (data_point != '')
                data_point += ", COMPANY_ID = '" + COMPANY_ID + "'"
               else
                data_point += "COMPANY_ID = '" + COMPANY_ID + "'"
       }

       if (data_point == '') {
               res.statusCode = 400
               res.set('Content-Type','Application/json');
               res.json({err:'Enter parameters to update'})
       }
       pool.query(`SELECT * FROM foods WHERE ITEM_ID = '${ITEM_ID}'`)
       .then(data => {
               if (data.length == 0) {
                       res.statusCode = 400;
                       res.set('Content-Type','Application/json');
                       res.json({err:'Invalid ITEM_ID'})
               }
               pool.query(`UPDATE foods SET ${data_point} WHERE ITEM_ID = '${ITEM_ID}'`)
               .then(row => {
                       res.statusCode = 200;
                       res.set('Content-Type','Application/json');
                       res.json("UPDATED SUCCESSFULLY")
               })
               .catch(err => console.error('Query error', err.stack));
       })
       .catch(err => console.error('Query error', err.stack));
   });


app.listen(port, () => {
    console.log('Example app listening at port',port);
});
