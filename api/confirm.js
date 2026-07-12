
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxH13j1yDpFszvXR9AhU5wtPAVxGzac5ZODHGQX4LrPrfGorPCgu1l-n424-Ya8iJ2JWg/exec';

export default async function handler(req, res) {
    const { token } = req.query;

    if (!token) {
        res.writeHead(302, { Location: '/?confirm=missing' });
        return res.end();
    }

    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?confirm=${encodeURIComponent(token)}`);
        const data = await response.json();

        const status = data.status || 'invalid';
        res.writeHead(302, { Location: `/?confirm=${status}` });
        return res.end();
    } catch (err) {
        console.error('Confirm proxy error:', err);
        res.writeHead(302, { Location: '/?confirm=invalid' });
        return res.end();
    }
}