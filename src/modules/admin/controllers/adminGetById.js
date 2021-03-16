import Admin from '../Model';

const adminGetById = async (req, res) => {
    const id = req.params.id;

    try {
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).send({ error: 'Admin not found' });
        }

        res.status(200).send(admin);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminGetById;
