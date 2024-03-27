const { Contract } = require('../model/model')

const ContractController = {
    getAllContract: async (req, res) => {
        try {
            const contracts = await Contract.find();
            res.status(200).json(contracts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addContract: async (req, res) => {
        try {
            const contract = new Contract(req.body);
            await contract.save()
            res.status(200).json("Add SUCCESS FULLY");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAnContract: async (req, res) => {
        try {
            const contract = await Contract.findNyId(req.params.id);
            res.status(200).json(contract);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = ContractController;