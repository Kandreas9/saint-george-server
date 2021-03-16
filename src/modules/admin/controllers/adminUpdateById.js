import Admin from '../Model';

const adminUpdateById = async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).send({ error: 'Admin not found' });
        }

        updates.forEach((update) => (admin[update] = req.body[update]));
        await admin.save();

        res.status(200).send(admin);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminUpdateById;
