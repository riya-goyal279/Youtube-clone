export const formatNumber = (input, decimalCount = 0) => {
    const num = Number(input);

    if (isNaN(num)) return 'Invalid number';

    const format = (value, suffix) => {
        const rounded = value.toFixed(decimalCount);
        return (rounded.endsWith('.0') ? parseInt(rounded) : rounded) + suffix;
    };

    if (num >= 1e12) return format(num / 1e12, 'T');
    if (num >= 1e9)  return format(num / 1e9, 'B');
    if (num >= 1e6)  return format(num / 1e6, 'M');
    if (num >= 1e3)  return format(num / 1e3, 'K');

    return num.toString();
};

export const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
        { label: 'year', seconds: 365 * 24 * 60 * 60 },
        { label: 'month', seconds: 30 * 24 * 60 * 60 },
        { label: 'day', seconds: 24 * 60 * 60 },
        { label: 'hour', seconds: 60 * 60 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (let unit of units) {
        const count = Math.floor(diffInSeconds / unit.seconds);
        if (count >= 1) {
            return `${count} ${unit.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};