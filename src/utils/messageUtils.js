export const isHtmlContent = (input) => {
  if (!input) return false;
  return /<\/?[a-z][\s\S]*>/i.test(input);
};

export const sanitizeHtml = (html) => {
  if (!html) return '';

  if (typeof window !== 'undefined') {
    const template = document.createElement('template');
    template.innerHTML = html;

    template.content.querySelectorAll('script, style').forEach((el) => el.remove());

    template.content.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const attrName = attr.name;
        const attrValue = attr.value;

        if (/^on/i.test(attrName)) {
          el.removeAttribute(attrName);
        }

        if (['href', 'src'].includes(attrName)) {
          if (attrValue && attrValue.trim().toLowerCase().startsWith('javascript:')) {
            el.removeAttribute(attrName);
          }
        }
      });
    });

    return template.innerHTML;
  }

  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
};

export const stripHtml = (html) => {
  if (!html) return '';

  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  return html.replace(/<[^>]*>/g, '');
};


