
const contactsOperation = require('../../model/db');
const { NotFound } = require('http-errors');

const remuveById = async (req, res) => {
   
        const { id } = req.params;
        const result = await contactsOperation.remuveById(id);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'contact delete',
            data: {
                result
            }
        })
    
};

module.exports = remuveById;