import Admin from '../Model';

const adminDeleteById = async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await Admin.deleteOne({ _id: id });

        if (!doc.n) {
            return res.status(404).send({ error: 'Admin not found' });
        }

        res.status(200).send({ message: 'Admin Deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminDeleteById;
