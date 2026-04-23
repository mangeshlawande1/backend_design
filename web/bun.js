import { serve } from "bun";

serve({
    fetch(request) {
        const url = new URL(request.url)
        if (url.pathname === '/') {
            return new Response("hello Ice tea...", { status: 200 })
        } else if (url.pathname === '/jack') {
            return new Response("hello jack sparrow calling ...", { status: 200 })
        } else {
            return new Response("Wrong Number", { status: 401 })
        }
    },
    port: 3000,
    hostname: '127.0.0.1',
});


// no scalable , no modular 
    