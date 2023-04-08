
// This will make your life easier in production, you can handle authentication and session management directly here
export const handle = async ({ event, resolve }) => {

    const response = await resolve(event);
    return response;
}