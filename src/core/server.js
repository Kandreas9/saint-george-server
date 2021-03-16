import chalk from 'chalk';

const port = process.env.PORT || 3000;

//---Start Server---
const server = (app) => {
    app.listen(port, () => {
        console.log(chalk.green.bold(`===Server is up on port ${port}===`));
    });
};

export default server;
