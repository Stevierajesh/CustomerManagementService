if (!globalThis.URLPattern) {
    require("urlpattern-polyfill");
}


const new_routing_page = (pageName) => {

    return new URLPattern({
        pathname: `pages/${pageName}`,
        hostname: host
    });
}


const p1 = new_routing_page('test1');