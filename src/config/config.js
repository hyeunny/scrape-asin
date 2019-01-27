module.exports = {
    apiHost: process.env.NODE_ENV === 'production' ? 'http://ec2-34-222-138-14.us-west-2.compute.amazonaws.com:3030' : 'http://localhost:3030'
}