import Admin from '../Model';

const adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);
        const token = await admin.generateAuthToken();

        res.status(200).send({ admin, token });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminLogin;
