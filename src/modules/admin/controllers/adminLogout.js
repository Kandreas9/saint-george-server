const adminLogout = async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.admin.save();

        res.status(200).send({ message: 'Logout succesfull' });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default adminLogout;
