module.exports = {
    endpoint: 'is-whitelist',
    route: 'get',
    execute(req, res) {
        return {response: `This is the IP of the user | ${req.ip}`}
    }
}