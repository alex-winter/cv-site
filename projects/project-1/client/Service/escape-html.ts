export function escapeHTML(str: string): string {
    const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '\\': '&#92;',
        '/': '&#47;',
    };

    return str.replace(
        /[&<>"'\\/]/g, 
        match => escapeMap[match] || match 
    );
}

type AnyObject = { [key: string]: any };

export function escapeHTMLInObject(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(item => escapeHTMLInObject(item));  // Recursively handle array items
    } else if (obj !== null && typeof obj === 'object') {
        const escapedObject: AnyObject = {};  // We'll store the escaped object here
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {  // Safe property check
                const value = obj[key];
                if (typeof value === 'string') {
                    escapedObject[key] = escapeHTML(value);  // Escape string values
                } else {
                    escapedObject[key] = escapeHTMLInObject(value);  // Recursively handle nested objects/arrays
                }
            }
        }
        return escapedObject;
    }
    return obj;  // Return primitive values (numbers, booleans, etc.) as is
}