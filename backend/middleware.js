require('dotenv').config();

const WHITELIST = JSON.parse(process.env.WHITELIST)

// HELPER FUNCTIONS
function ipv4_normalizer(ip) {
    if (!ip.startsWith('::ffff:')) {return ip}
    return ip.substring(7); 
}

class securityChecker {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.failed = false;
    }

    verify_whitelist() {

        // Skip if there has already been a security error
        if (this.failed) {return this}

        // If IP is an IPv6, convert to IPv4
        const ip = ipv4_normalizer(this.req.ip)
        
        console.log('verifying ip..')

        // Check for IP in IP Whitelist, if it finds a match continue down the chain
        for(let i = 0; i < WHITELIST.length; i++) {
            const entry = WHITELIST[i]
            if (entry.address == ip) {
                console.log(`Confirmed Authenticity with connection ${entry.access}`)
                return this;
            }
        }

        // Could not find IP, mark security check as a failure and continue
        console.log('Could not find the ip in the whitelist.');
        this.failed = true;
        return this;
    }

    always_succeeds() {
        console.log('the universe still works 🙏')
        return this;
    }

    always_fails() {
        console.log('the universe hates you 😡')
        this.failed = true;
        return this;
    }

    // The final method in the security chain, await this method to recieve whether or not any of the secuirity checks failed
    async process() {
        if (this.failed) {
            this.res.status(403).send('Failed to validate that the connection was secure, check logs for more details')
        }

        return this.failed;
    }
}



async function validate_path(req, res, next) {
    const input = req.path;
    const parts = input.split('/');
    const match = '/' + parts.slice(1, 2).join('/');

    console.log(`User | ${req.ip} \n is attempting to access the endpoint ${input}`)
    
    switch (match) {
        case '/private':
            const failed = 
            await new securityChecker(req, res)
                .verify_whitelist()
                .always_succeeds()
                .process();

            if (failed) {return;}

            next();
            break;
        
        case '/public':
            next();
        break;

        default:
            res.status(403).send(`path ${match} is not officially registered or supported`)
        break;
    }
}

module.exports = { validate_path }