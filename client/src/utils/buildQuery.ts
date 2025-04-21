interface Params {
    [key: string]: string | number | undefined;
}

export const buildQuery = (params: Params): string => {
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return query ? `?${query}` : '';
};
