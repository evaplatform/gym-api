export function log(...messages: any[]) {
    if (process.env.DEBUG === 'true') {
        console.log('[DEBUG]', ...messages);
    }
}