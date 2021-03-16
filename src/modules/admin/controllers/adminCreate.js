import Admin from '../Model';

const adminCreate = async (req, res) => {
    // name, email, password => required;
    const admin = new Admin(req.body);

    try {
        await admin.save();
        const token = await admin.generateAuthToken();

        res.status(201).send({ admin, token });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminCreate;
